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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      assistant_knowledge: {
        Row: {
          assistant_id: string
          source_id: string
          workspace_id: string
        }
        Insert: {
          assistant_id: string
          source_id: string
          workspace_id: string
        }
        Update: {
          assistant_id?: string
          source_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_knowledge_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistant_knowledge_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "knowledge_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistant_knowledge_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      assistants: {
        Row: {
          channel: Database["public"]["Enums"]["assistant_channel"]
          created_at: string
          created_by: string
          description: string
          fallback_message: string
          id: string
          instructions: string
          language: string
          name: string
          primary_color: string
          status: Database["public"]["Enums"]["assistant_status"]
          tone: string
          updated_at: string
          welcome_message: string
          workspace_id: string
        }
        Insert: {
          channel?: Database["public"]["Enums"]["assistant_channel"]
          created_at?: string
          created_by: string
          description?: string
          fallback_message?: string
          id?: string
          instructions?: string
          language?: string
          name: string
          primary_color?: string
          status?: Database["public"]["Enums"]["assistant_status"]
          tone?: string
          updated_at?: string
          welcome_message?: string
          workspace_id: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["assistant_channel"]
          created_at?: string
          created_by?: string
          description?: string
          fallback_message?: string
          id?: string
          instructions?: string
          language?: string
          name?: string
          primary_color?: string
          status?: Database["public"]["Enums"]["assistant_status"]
          tone?: string
          updated_at?: string
          welcome_message?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistants_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          topic: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          topic?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          topic?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          assistant_id: string
          channel: Database["public"]["Enums"]["assistant_channel"]
          created_at: string
          id: string
          last_message_at: string
          message_count: number
          source: string
          title: string
          visitor_id: string
          workspace_id: string
        }
        Insert: {
          assistant_id: string
          channel?: Database["public"]["Enums"]["assistant_channel"]
          created_at?: string
          id?: string
          last_message_at?: string
          message_count?: number
          source?: string
          title?: string
          visitor_id: string
          workspace_id: string
        }
        Update: {
          assistant_id?: string
          channel?: Database["public"]["Enums"]["assistant_channel"]
          created_at?: string
          id?: string
          last_message_at?: string
          message_count?: number
          source?: string
          title?: string
          visitor_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_sources: {
        Row: {
          char_count: number | null
          content: string
          created_at: string
          created_by: string
          id: string
          source_type: string
          source_url: string | null
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          char_count?: number | null
          content?: string
          created_at?: string
          created_by: string
          id?: string
          source_type?: string
          source_url?: string | null
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          char_count?: number | null
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          source_type?: string
          source_url?: string | null
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_sources_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          input_tokens: number | null
          output_tokens: number | null
          role: string
          workspace_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          role: string
          workspace_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          role?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          advanced_customization: boolean
          ai_model: string
          analytics_days: number
          context_chunks: number
          currency: string
          features: string[]
          id: string
          is_custom: boolean
          is_highlighted: boolean
          max_ai_messages_month: number
          max_assistants: number
          max_knowledge_chars: number
          max_members: number
          name: string
          overage_per_1000_messages: number | null
          overage_per_voice_minute: number | null
          price_monthly: number | null
          price_yearly: number | null
          remove_branding: boolean
          sort_order: number
          tagline: string
          updated_at: string
          voice_enabled: boolean
          voice_minutes_month: number
          web_enabled: boolean
          whatsapp_enabled: boolean
          whatsapp_numbers: number
        }
        Insert: {
          advanced_customization?: boolean
          ai_model?: string
          analytics_days?: number
          context_chunks?: number
          currency?: string
          features?: string[]
          id: string
          is_custom?: boolean
          is_highlighted?: boolean
          max_ai_messages_month?: number
          max_assistants?: number
          max_knowledge_chars?: number
          max_members?: number
          name: string
          overage_per_1000_messages?: number | null
          overage_per_voice_minute?: number | null
          price_monthly?: number | null
          price_yearly?: number | null
          remove_branding?: boolean
          sort_order?: number
          tagline?: string
          updated_at?: string
          voice_enabled?: boolean
          voice_minutes_month?: number
          web_enabled?: boolean
          whatsapp_enabled?: boolean
          whatsapp_numbers?: number
        }
        Update: {
          advanced_customization?: boolean
          ai_model?: string
          analytics_days?: number
          context_chunks?: number
          currency?: string
          features?: string[]
          id?: string
          is_custom?: boolean
          is_highlighted?: boolean
          max_ai_messages_month?: number
          max_assistants?: number
          max_knowledge_chars?: number
          max_members?: number
          name?: string
          overage_per_1000_messages?: number | null
          overage_per_voice_minute?: number | null
          price_monthly?: number | null
          price_yearly?: number | null
          remove_branding?: boolean
          sort_order?: number
          tagline?: string
          updated_at?: string
          voice_enabled?: boolean
          voice_minutes_month?: number
          web_enabled?: boolean
          whatsapp_enabled?: boolean
          whatsapp_numbers?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workspace_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          role: Database["public"]["Enums"]["workspace_role"]
          workspace_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          role?: Database["public"]["Enums"]["workspace_role"]
          workspace_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          billing_status: string
          created_at: string
          created_by: string
          id: string
          name: string
          plan_id: string
          updated_at: string
        }
        Insert: {
          billing_status?: string
          created_at?: string
          created_by: string
          id?: string
          name: string
          plan_id?: string
          updated_at?: string
        }
        Update: {
          billing_status?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          plan_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invitation: { Args: { _invitation: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_workspace_manager: { Args: { _ws: string }; Returns: boolean }
      is_workspace_member: { Args: { _ws: string }; Returns: boolean }
      my_workspace_usage: { Args: { _ws: string }; Returns: number }
      shares_workspace: { Args: { _other: string }; Returns: boolean }
      workspace_ai_usage: { Args: { _ws: string }; Returns: number }
      workspace_daily_stats: {
        Args: { _days: number; _ws: string }
        Returns: {
          ai_messages: number
          conversations: number
          day: string
          user_messages: number
        }[]
      }
      workspace_plan: {
        Args: { _ws: string }
        Returns: {
          advanced_customization: boolean
          ai_model: string
          analytics_days: number
          context_chunks: number
          currency: string
          features: string[]
          id: string
          is_custom: boolean
          is_highlighted: boolean
          max_ai_messages_month: number
          max_assistants: number
          max_knowledge_chars: number
          max_members: number
          name: string
          overage_per_1000_messages: number | null
          overage_per_voice_minute: number | null
          price_monthly: number | null
          price_yearly: number | null
          remove_branding: boolean
          sort_order: number
          tagline: string
          updated_at: string
          voice_enabled: boolean
          voice_minutes_month: number
          web_enabled: boolean
          whatsapp_enabled: boolean
          whatsapp_numbers: number
        }
        SetofOptions: {
          from: "*"
          to: "plans"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "admin" | "user"
      assistant_channel: "web" | "whatsapp" | "voice"
      assistant_status: "draft" | "active" | "paused"
      workspace_role: "owner" | "admin" | "member"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
      assistant_channel: ["web", "whatsapp", "voice"],
      assistant_status: ["draft", "active", "paused"],
      workspace_role: ["owner", "admin", "member"],
    },
  },
} as const
