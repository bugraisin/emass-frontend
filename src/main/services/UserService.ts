import axios, { AxiosInstance } from "axios";

export interface UserData {
    userId: number;
    email: string;
    username: string;
    isLoggedIn: boolean;
    token: string;
}

export class UserService {
    private static readonly BASE_URL = 'http://localhost:8080/api';
    private static axiosInstance: AxiosInstance;

    // Axios instance'ını başlat
    private static initializeAxios() {
        if (!this.axiosInstance) {
            this.axiosInstance = axios.create({
                baseURL: this.BASE_URL,
                timeout: 10000,
            });

            // Request interceptor - her istekte token'ı header'a ekle
            this.axiosInstance.interceptors.request.use(
                (config) => {
                    const token = this.getToken();
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            // Response interceptor - token süresi dolduğunda logout yap
            this.axiosInstance.interceptors.response.use(
                (response) => response,
                (error) => {
                    if (error.response?.status === 401) {
                        this.logout();
                        window.location.href = '/giris-yap';
                    }
                    return Promise.reject(error);
                }
            );
        }
        return this.axiosInstance;
    }
    // UserService.ts'de performLogin methodunda
    public static async performLogin(email: string, password: string): Promise<UserData> {
        const loginData = {
            email: email,
            password: password,
        };

        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
        
        console.log('Backend response:', response.data); // ← Bunu ekle
        
        const userData: UserData = {
            userId: response.data.user.userId,
            email: email,
            username: response.data.name || email.split('@')[0],
            isLoggedIn: true,
            token: response.data.token || response.data.accessToken || ''
        };
        
        console.log('UserData:', userData); // ← Bunu da ekle
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);

        return userData;
    }

    // Register işlemi
    public static async performRegister(username: string, email: string, password: string) {
        const registerData = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, registerData);
            return response.data;
        } catch(error) {
            throw error;
        }

    }

    // Logout işlemi
    public static logout(): void {
        localStorage.clear();
        window.dispatchEvent(new Event('loginStateChange'));
    }

    // Token'ı al
    public static getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Kullanıcı bilgilerini al
    public static getCurrentUser(): UserData | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    // Login durumunu kontrol et
    public static isLoggedIn(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user?.isLoggedIn);
    }

    // Korumalı API istekleri için axios instance'ını al
    public static getAxiosInstance(): AxiosInstance {
        return this.initializeAxios();
    }

    // Diğer API metodları için örnekler
    public static async getUserProfile(): Promise<any> {
        const axios = this.getAxiosInstance();
        const response = await axios.get('/user/profile');
        return response.data;
    }

    public static async updateUserProfile(userData: any): Promise<any> {
        const axios = this.getAxiosInstance();
        const response = await axios.put('/user/profile', userData);
        return response.data;
    }

    public static async getUserListings(): Promise<any> {
        const axios = this.getAxiosInstance();
        const response = await axios.get('/user/listings');
        return response.data;
    }
}