// services/FavoritesService.ts

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
    private static readonly BASE_URL = 'http://localhost:8080/api';

    /**
     * Kullanıcının favori ilanlarını getirir
     */
    public static async getFavoriteListings(userId: number): Promise<FavoriteListingItem[]> {
        try {
            const response = await fetch(`${this.BASE_URL}/favorites?userId=${userId}`);
            
            if (response.ok) {
                const favorites = await response.json();
                return favorites;
            }
            
            return [];
        } catch (error) {
            console.error('Favori ilanlar yüklenirken hata:', error);
            return [];
        }
    }

    /**
     * İlanı favoriye ekler
     */
    public static async addToFavorites(listingId: string, userId: number): Promise<boolean> {
        try {
            const response = await fetch(
                `${this.BASE_URL}/favorites/${listingId}`,
                { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                }
            );

            return response.ok;
        } catch (error) {
            console.error("Favoriye ekleme hatası:", error);
            return false;
        }
    }

    /**
     * İlanı favoriden çıkarır
     */
    public static async removeFromFavorites(listingId: string, userId: number): Promise<boolean> {
        try {
            const response = await fetch(
                `${this.BASE_URL}/favorites/${listingId}`,
                { 
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                }
            );

            return response.ok;
        } catch (error) {
            console.error("Favoriden çıkarma hatası:", error);
            return false;
        }
    }

    /**
     * Kullanıcının belirli bir ilanı favorilediğini kontrol eder
     */
    public static async checkFavoriteStatus(listingId: string, userId: number): Promise<boolean> {
        try {
            const response = await fetch(
                `${this.BASE_URL}/favorites/${listingId}/check?userId=${userId}`
            );
            
            if (response.ok) {
                return await response.json();
            }
            
            return false;
        } catch (error) {
            console.error("Favorite durumu kontrol edilirken hata", error);
            return false;
        }
    }

    /**
     * Belirli bir ilanın toplam favori sayısını getirir
     */
    public static async getFavoriteCount(listingId: string): Promise<number> {
        try {
            const response = await fetch(`${this.BASE_URL}/favorites/count/${listingId}`);
            
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
     * Favori toggle işlemi - ekli ise çıkarır, değilse ekler
     */
    public static async toggleFavorite(listingId: string, userId: number): Promise<boolean> {
        try {
            const currentStatus = await this.checkFavoriteStatus(listingId, userId);
            
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