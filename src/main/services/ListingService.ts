interface ListingData {
  id: string;
  listingType: string;
  propertyType: string;
  subtype: string;
  title: string;
  description: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
  photos: any[];
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

interface CreateListingPayload {
  ownerId: number;
  title: string;
  description: string;
  listingType: string;
  propertyType: string;
  price: number;
  city: string;
  district: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  housingDetails?: any;
  commercialDetails?: any;
  officeDetails?: any;
  industrialDetails?: any;
  landDetails?: any;
  serviceDetails?: any;
}

interface Photo {
  id: string;
  file: File;
  url: string;
  isMain: boolean;
}

export class ListingService {
  private static readonly BASE_URL = 'http://localhost:8080/api';

  /**
   * Tüm ilanları getirir
   */
  public static async getAllListings(): Promise<any[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/listings/get-all`);

      if (!response.ok) {
        throw new Error("İlanlar Yüklenemedi");
      }
      
      return response.json();
    } catch (error) {
      console.error('Tüm ilanlar yüklenirken hata:', error);
      throw error;
    }
  }

  /**
   * Belirli bir ilanın detaylarını getirir
   */
  public static async getListingById(id: string): Promise<ListingData> {
    try {
      const response = await fetch(`${this.BASE_URL}/listings/${id}`);
      
      if (!response.ok) {
        throw new Error('İlan yüklenirken hata oluştu');
      }
      
      const backendData = await response.json();
      
      const mappedListing: ListingData = {
        id: backendData.id.toString(),
        listingType: backendData.listingType,
        propertyType: backendData.propertyType,
        subtype: backendData.details?.subtype || '',
        title: backendData.title,
        description: backendData.description,
        price: backendData.price.toString(),
        city: backendData.city,
        district: backendData.district,
        neighborhood: backendData.neighborhood,
        details: backendData.details || {},
        photos: backendData.photoUrls ? backendData.photoUrls.map((photo: any) => ({
          id: photo.id.toString(),
          url: photo.imageUrl,
          isMain: photo.seqNumber === 1
        })) : [],
        latitude: backendData.latitude,
        longitude: backendData.longitude,
        createdAt: backendData.createdAt
      };
      
      return mappedListing;
    } catch (error) {
      console.error('İlan detayları yüklenirken hata:', error);
      throw new Error('İlan detayları yüklenirken bir hata oluştu');
    }
  }

  /**
   * İlan arama işlemi
   */
  public static async searchListings(searchParams: any): Promise<any[]> {
    try {
      const queryParams = new URLSearchParams(searchParams);
      const response = await fetch(`${this.BASE_URL}/listings/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Arama işlemi başarısız');
      }
      
      return response.json();
    } catch (error) {
      console.error('İlan arama hatası:', error);
      throw error;
    }
  }

  /**
   * Yeni ilan oluşturma
   */
  public static async createListing(listingData: CreateListingPayload): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen hata' }));
        throw new Error(errorData.message || 'İlan oluşturulamadı');
      }
      
      return response.json();
    } catch (error) {
      console.error('İlan oluşturma hatası:', error);
      throw error;
    }
  }

  /**
   * İlan fotoğraflarını yükleme
   */
  public static async uploadListingPhotos(listingId: string, photos: Photo[]): Promise<void> {
    const validPhotos = photos.filter(photo => {
      return photo.file.size > 0 && 
             photo.file.size <= 5 * 1024 * 1024 && 
             photo.file.type.startsWith('image/');
    });

    if (validPhotos.length === 0) {
      throw new Error("İlan oluşturuldu ancak yüklenen fotoğraflar geçersiz. Lütfen JPG, PNG veya WebP formatında, 5MB'dan küçük geçerli resim dosyaları seçin.");
    }

    if (validPhotos.length < photos.length) {
      console.warn(`${photos.length - validPhotos.length} fotoğraf geçersiz olduğu için atlandı.`);
    }

    const formData = new FormData();
    validPhotos.forEach(photo => {
      formData.append('photos', photo.file);
    });

    const response = await fetch(`${this.BASE_URL}/listings/${listingId}/photos`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const photoErrorData = await response.text().catch(() => 'Bilinmeyen hata');
      throw new Error("İlan oluşturuldu ancak fotoğraflar yüklenirken hata oluştu. Lütfen fotoğraflarınızı kontrol edin.");
    }
    
  }
}