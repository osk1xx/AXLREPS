export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_credentials: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          token?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon_url: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          icon_url?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string
          body: Json
          cover_url: string | null
          id: string
          is_published: boolean
          published_at: string
          slug: string
          title: Json
        }
        Insert: {
          author?: string
          body?: Json
          cover_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug: string
          title?: Json
        }
        Update: {
          author?: string
          body?: Json
          cover_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug?: string
          title?: Json
        }
        Relationships: []
      }
      products: {
        Row: {
          badge: Database["public"]["Enums"]["product_badge"] | null
          brand_id: string | null
          category: string | null
          category_id: string | null
          created_at: string
          id: string
          image_url: string | null
          is_draft: boolean
          link: string
          name: string
          price_cny: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          badge?: Database["public"]["Enums"]["product_badge"] | null
          brand_id?: string | null
          category?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_draft?: boolean
          link: string
          name: string
          price_cny?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          badge?: Database["public"]["Enums"]["product_badge"] | null
          brand_id?: string | null
          category?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_draft?: boolean
          link?: string
          name?: string
          price_cny?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      qc_sources: {
        Row: {
          enabled: boolean
          id: string
          name: string
          url_template: string
        }
        Insert: {
          enabled?: boolean
          id?: string
          name: string
          url_template: string
        }
        Update: {
          enabled?: boolean
          id?: string
          name?: string
          url_template?: string
        }
        Relationships: []
      }
      sellers: {
        Row: {
          best_for_brand: string | null
          bio: Json
          created_at: string
          id: string
          name: string
          photo_url: string | null
          product_photos: Json
          rating: number
          slug: string
        }
        Insert: {
          best_for_brand?: string | null
          bio?: Json
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          product_photos?: Json
          rating: number
          slug: string
        }
        Update: {
          best_for_brand?: string | null
          bio?: Json
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          product_photos?: Json
          rating?: number
          slug?: string
        }
        Relationships: []
      }
      site_config: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      sizer_entries: {
        Row: {
          bucket: Database["public"]["Enums"]["size_bucket"]
          id: string
          product_name: string
          sort_order: number
        }
        Insert: {
          bucket: Database["public"]["Enums"]["size_bucket"]
          id?: string
          product_name: string
          sort_order?: number
        }
        Update: {
          bucket?: Database["public"]["Enums"]["size_bucket"]
          id?: string
          product_name?: string
          sort_order?: number
        }
        Relationships: []
      }
      tutorial_steps: {
        Row: {
          body: Json
          buttons: Json
          id: string
          image_urls: Json
          step_index: number
          title: Json
          tutorial_id: string
        }
        Insert: {
          body?: Json
          buttons?: Json
          id?: string
          image_urls?: Json
          step_index: number
          title?: Json
          tutorial_id: string
        }
        Update: {
          body?: Json
          buttons?: Json
          id?: string
          image_urls?: Json
          step_index?: number
          title?: Json
          tutorial_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutorial_steps_tutorial_id_fkey"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
      tutorials: {
        Row: {
          cover_url: string | null
          created_at: string
          description: Json
          id: string
          is_published: boolean
          slug: string
          title: Json
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: Json
          id?: string
          is_published?: boolean
          slug: string
          title?: Json
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: Json
          id?: string
          is_published?: boolean
          slug?: string
          title?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      verify_admin_password: {
        Args: { _password: string; _username: string }
        Returns: boolean
      }
    }
    Enums: {
      product_badge: "best_batch" | "random_batch" | "budget_batch"
      size_bucket:
        | "plus1"
        | "plus_half"
        | "tts"
        | "minus_half"
        | "minus1"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      product_badge: ["best_batch", "random_batch", "budget_batch"],
      size_bucket: [
        "plus1",
        "plus_half",
        "tts",
        "minus_half",
        "minus1",
        "other",
      ],
    },
  },
} as const
