// services/FavoritesService.ts
import { UserService } from './UserService.ts';

export interface FavoriteListingItem {
    id: string;
    title: string;
    price: string;
    district: string;
    neighborhood: string;
    thumbnailUrl: string;
    createdAt: string;
}

export class FavoritesService {

    /**
     * Kullanıcının favori ilanlarını getirir (korumalı endpoint)
     */
    public static async getFavoriteListings(userId: number): Promise<FavoriteListingItem[]> {
        try {
            const axios = UserService.getAxiosInstance();
            const response = await axios.get(`/favorites?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Favori ilanlar yüklenirken hata:', error);
            return [];
        }
    }

    /**
     * İlanı favoriye ekler (korumalı endpoint)
     */
    public static async addToFavorites(listingId: string, userId: number): Promise<boolean> {
        console.log('listingId:', listingId, 'type:', typeof listingId);
        console.log('userId:', userId, 'type:', typeof userId);
        
        try {
            const axios = UserService.getAxiosInstance();
            await axios.post(`/favorites/${listingId}`, { userId });
            return true;
        } catch (error) {
            console.error("Favoriye ekleme hatası:", error);
            return false;
        }
    }

    /**
     * İlanı favoriden çıkarır (korumalı endpoint)
     */
    public static async removeFromFavorites(listingId: string, userId: number): Promise<boolean> {
        try {
            const axios = UserService.getAxiosInstance();
            await axios.delete(`/favorites/${listingId}`, { 
                data: { userId }
            });
            return true;
        } catch (error) {
            console.error("Favoriden çıkarma hatası:", error);
            return false;
        }
    }

    /**
     * Kullanıcının belirli bir ilanı favorilediğini kontrol eder (korumalı endpoint)
     */
    public static async isFavorited(listingId: string, userId: number): Promise<boolean> {
        try {
            const axios = UserService.getAxiosInstance();
            const response = await axios.get(`/favorites/${listingId}/check?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error("Favorite durumu kontrol edilirken hata", error);
            return false;
        }
    }

    /**
     * Belirli bir ilanın toplam favori sayısını getirir (public endpoint)
     */
    public static async getFavoriteCount(listingId: string): Promise<number> {
        try {
            // Public endpoint olduğu için normal fetch kullan
            const response = await fetch(`${UserService['BASE_URL']}/favorites/count/${listingId}`);
            
            if (response.ok) {
                return await response.json();
            }
            
            return 0;
        } catch (error) {
            console.error("Favori sayısı alınırken hata", error);
            return 0;
        }
    }

    /**
     * Favori değişiklik event'ini dispatch eder
     */
    public static dispatchFavoritesChanged(): void {
        window.dispatchEvent(new Event('favoritesChanged'));
    }

    /**
     * Favori toggle işlemi - ekli ise çıkarır, değilse ekler (korumalı endpoint)
     */
    public static async toggleFavorite(listingId: string, userId: number): Promise<boolean> {
        try {
            const currentStatus = await this.isFavorited(listingId, userId);
            
            let success: boolean;
            if (currentStatus) {
                success = await this.removeFromFavorites(listingId, userId);
            } else {
                success = await this.addToFavorites(listingId, userId);
            }
            
            if (success) {
                this.dispatchFavoritesChanged();
                return !currentStatus;
            }
            
            return currentStatus;
        } catch (error) {
            console.error("Favori toggle hatası:", error);
            return false;
        }
    }
}