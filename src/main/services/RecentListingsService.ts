// services/RecentListingsService.ts

export interface RecentListingItem {
    id: string;
    title: string;
    price: string;
    district: string;
    neighborhood: string;
    thumbnailUrl: string;
    createdAt: string;
    viewedAt: string;
}

export class RecentListingsService {
    private static readonly STORAGE_KEY = "recentListings";
    private static readonly EVENT_NAME = "recentListingsChanged";
    private static readonly MAX_ITEMS = 10;

    /**
     * localStorage'dan recent listings'leri getirir
     */
    static getRecentListings(): RecentListingItem[] {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Recent listings alınırken hata:', error);
            return [];
        }
    }

    /**
     * Recent listings'leri localStorage'a kaydeder
     */
    private static saveRecentListings(listings: RecentListingItem[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(listings));
            this.dispatchRecentListingsChanged();
        } catch (error) {
            console.error('Recent listings kaydetme hatası:', error);
        }
    }

    /**
     * Recent listings değiştiğini diğer componentlere bildirir
     */
    private static dispatchRecentListingsChanged(): void {
        window.dispatchEvent(new Event(this.EVENT_NAME));
    }

    /**
     * İlanı recent listings'e ekler
     */
    static addToRecentListings(listing: any): void {
        try {
            let recentListings = this.getRecentListings();
            const listingId = String(listing.id);
            
            // Aynı ilanı listeden çıkar (en üste eklemek için)
            recentListings = recentListings.filter(item => String(item.id) !== listingId);
            
            const recentItem: RecentListingItem = {
                id: listingId,
                title: listing.title || '',
                price: String(listing.price || ''),
                district: listing.district || '',
                neighborhood: listing.neighborhood || '',
                thumbnailUrl: listing.thumbnailUrl || listing.imageUrl || listing.image || listing.photos?.[0]?.url || '',
                createdAt: listing.createdAt || new Date().toISOString(),
                viewedAt: new Date().toISOString()
            };
            
            // En başa ekle
            recentListings.unshift(recentItem);
            
            // Maksimum sayıyı aşmasın
            if (recentListings.length > this.MAX_ITEMS) {
                recentListings = recentListings.slice(0, this.MAX_ITEMS);
            }
            
            this.saveRecentListings(recentListings);
        } catch (error) {
            console.error('Recent listings kaydedilirken hata:', error);
        }
    }

    /**
     * İlanı recent listings'ten çıkarır
     */
    static removeFromRecentListings(listingId: string): RecentListingItem[] {
        try {
            const recentListings = this.getRecentListings();
            const id = String(listingId);
            const updated = recentListings.filter(item => String(item.id) !== id);
            this.saveRecentListings(updated);
            return updated;
        } catch (error) {
            console.error('Recent listings silme hatası:', error);
            return this.getRecentListings();
        }
    }

    /**
     * Tüm recent listings'leri temizler
     */
    static clearAllRecentListings(): void {
        this.saveRecentListings([]);
    }

    /**
     * Recent listings değişikliklerini dinlemek için event listener ekler
     */
    static addRecentListingsChangeListener(callback: () => void): () => void {
        const handleChange = () => callback();
        window.addEventListener(this.EVENT_NAME, handleChange);
        
        return () => {
            window.removeEventListener(this.EVENT_NAME, handleChange);
        };
    }

    /**
     * Recent listings değişikliklerini dinleme ve callback çalıştırma
     */
    static subscribeToRecentListings(callback: (listings: RecentListingItem[]) => void): () => void {
        const handleChange = () => {
            const updatedListings = this.getRecentListings();
            callback(updatedListings);
        };

        return this.addRecentListingsChangeListener(handleChange);
    }
}