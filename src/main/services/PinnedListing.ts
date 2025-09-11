export interface PinnedListingItem {
    id: string;
    title: string;
    price: string;
    district: string;
    neighborhood: string;
    thumbnailUrl: string;
    createdAt: string;
}

export class PinnedListingService {
    private static readonly STORAGE_KEY = "pinnedListings";
    private static readonly EVENT_NAME = "pinnedListingsChanged";

    static getPinnedListings(): PinnedListingItem[] {
        try {
            const savedListings = localStorage.getItem(this.STORAGE_KEY);
            return savedListings ? JSON.parse(savedListings) : [];
        } catch(error) {
            console.error("Pinned Listings okunamadı", error);
            localStorage.removeItem(this.STORAGE_KEY);
            return [];
        }
    }

    private static savePinnedListings(listings: PinnedListingItem[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(listings));
            this.dispatchPinnedListingsChanged();
        } catch (error) {
            console.error('Pinned listings kaydetme hatası:', error);
        }
    }

    private static dispatchPinnedListingsChanged(): void {
        window.dispatchEvent(new Event(this.EVENT_NAME));
    }

    static isListingPinned(listingId: string | number): boolean {
        const pinnedListings = this.getPinnedListings();
        return pinnedListings.some(p => String(p.id) === listingId);
    }

    static togglePinListing(listing: any): boolean {
        const pinnedListings = this.getPinnedListings();
        const listingId = String(listing.id);
        const isAlreadyPinned = pinnedListings.some(p => String(p.id) === listingId);

        let updatedListings: PinnedListingItem[];

        if (isAlreadyPinned) {
            updatedListings = pinnedListings.filter(p => String(p.id) !== listingId);
        } else {
            const pinnedItem: PinnedListingItem = {
                id: listingId,
                title: listing.title || '',
                price: String(listing.price || ''),
                district: listing.district || '',
                neighborhood: listing.neighborhood || '',
                thumbnailUrl: listing.thumbnailUrl || listing.imageUrl || listing.image || listing.photos?.[0]?.url || '',
                createdAt: listing.createdAt || new Date().toISOString()
            };
            updatedListings = [...pinnedListings, pinnedItem];
        }

        this.savePinnedListings(updatedListings);
        return !isAlreadyPinned;
    }
        static unpinListing(listingId: string | number): void {
        const pinnedListings = this.getPinnedListings();
        const updatedListings = pinnedListings.filter(p => String(p.id) !== String(listingId));
        this.savePinnedListings(updatedListings);
    }

    static clearAllPinnedListings(): void {
        this.savePinnedListings([]);
    }

    static addPinnedListingsChangeListener(callback: () => void): () => void {
        const handleChange = () => callback();
        window.addEventListener(this.EVENT_NAME, handleChange);

        return () => {
            window.removeEventListener(this.EVENT_NAME, handleChange);
        };
    }

    static subscribeToPinnedListings(callback: (listings: PinnedListingItem[]) => void): () => void {
        const handleChange = () => {
            const updatedListings = this.getPinnedListings();
            callback(updatedListings);
        };

        return this.addPinnedListingsChangeListener(handleChange);
    }

}