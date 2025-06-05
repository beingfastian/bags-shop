import { ContactData, ContactResponse } from "@/types/contact";
import axios from '@/lib/axios';

export const sendMessage = async (contactData: ContactData): Promise<ContactResponse> => {
    try {
      const response = await axios.post<ContactResponse>('/contact', contactData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Something went wrong');
    }
  }