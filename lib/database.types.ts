export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          id: number
          user_id: string
          title: string
          first_name: string
          last_name: string
          company: string | null
          address_line_1: string
          address_line_2: string | null
          city: string
          state: string | null
          postal_code: string | null
          country: string
          phone: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          first_name: string
          last_name: string
          company?: string | null
          address_line_1: string
          address_line_2?: string | null
          city: string
          state?: string | null
          postal_code?: string | null
          country?: string
          phone?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          first_name?: string
          last_name?: string
          company?: string | null
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          state?: string | null
          postal_code?: string | null
          country?: string
          phone?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          product_id: number
          quantity: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          product_id: number
          quantity?: number
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          image_url: string | null
          icon: string | null
          parent_id: number | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          parent_id?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          parent_id?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      coupons: {
        Row: {
          id: number
          code: string
          name: string
          description: string | null
          type: string
          value: number
          minimum_amount: number
          maximum_discount: number | null
          usage_limit: number | null
          used_count: number
          is_active: boolean
          starts_at: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          code: string
          name: string
          description?: string | null
          type: string
          value: number
          minimum_amount?: number
          maximum_discount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          code?: string
          name?: string
          description?: string | null
          type?: string
          value?: number
          minimum_amount?: number
          maximum_discount?: number | null
          usage_limit?: number | null
          used_count?: number
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: number
          user_id: string
          product_id: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          product_id: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          product_id?: number
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number | null
          product_name: string
          product_image: string | null
          quantity: number
          price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id?: number | null
          product_name: string
          product_image?: string | null
          quantity: number
          price: number
          total: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number | null
          product_name?: string
          product_image?: string | null
          quantity?: number
          price?: number
          total?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string | null
          order_number: string
          status: string
          payment_status: string
          payment_method: string | null
          payment_id: string | null
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          currency: string
          shipping_address: Json | null
          billing_address: Json | null
          notes: string | null
          delivered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          order_number: string
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          currency?: string
          shipping_address?: Json | null
          billing_address?: Json | null
          notes?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          order_number?: string
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          currency?: string
          shipping_address?: Json | null
          billing_address?: Json | null
          notes?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_reviews: {
        Row: {
          id: number
          product_id: number
          user_id: string
          order_id: number | null
          rating: number
          title: string | null
          comment: string | null
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          product_id: number
          user_id: string
          order_id?: number | null
          rating: number
          title?: string | null
          comment?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          user_id?: string
          order_id?: number | null
          rating?: number
          title?: string | null
          comment?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          original_price: number | null
          sku: string | null
          stock_quantity: number
          category_id: number | null
          images: Json
          is_featured: boolean
          is_bestseller: boolean
          is_new: boolean
          is_active: boolean
          meta_title: string | null
          meta_description: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          original_price?: number | null
          sku?: string | null
          stock_quantity?: number
          category_id?: number | null
          images?: Json
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          original_price?: number | null
          sku?: string | null
          stock_quantity?: number
          category_id?: number | null
          images?: Json
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          birth_date: string | null
          gender: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          birth_date?: string | null
          gender?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          birth_date?: string | null
          gender?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
