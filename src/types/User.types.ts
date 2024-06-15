export interface GetUserResponse {
  result: Result;
}

export interface Result {
  user: User;
  status: string;
}

export interface User {
  primary_profile_link_type: number;
  show_fb_link_on_profile: boolean;
  show_fb_page_link_on_profile: boolean;
  can_hide_category: boolean;
  account_type: number;
  smb_support_partner: null;
  current_catalog_id: null;
  mini_shop_seller_onboarding_status: null;
  account_category: string;
  can_add_fb_group_link_on_profile: boolean;
  can_use_affiliate_partnership_messaging_as_creator: boolean;
  can_use_affiliate_partnership_messaging_as_brand: boolean;
  existing_user_age_collection_enabled: boolean;
  fbid_v2: string;
  feed_post_reshare_disabled: boolean;
  full_name: string;
  has_guides: boolean;
  has_ig_profile: boolean;
  has_public_tab_threads: boolean;
  highlight_reshare_disabled: boolean;
  include_direct_blacklist_status: boolean;
  is_direct_roll_call_enabled: boolean;
  is_eligible_for_meta_verified_links_in_reels: boolean;
  is_new_to_instagram: boolean;
  is_parenting_account: boolean;
  is_private: boolean;
  is_secondary_account_creation: boolean;
  pk: string;
  pk_id: string;
  profile_type: number;
  show_account_transparency_details: boolean;
  show_ig_app_switcher_badge: boolean;
  show_post_insights_entry_point: boolean;
  show_text_post_app_badge: boolean;
  show_text_post_app_switcher_badge: boolean;
  third_party_downloads_enabled: number;
  username: string;
  is_profile_picture_expansion_enabled: boolean;
  is_opal_enabled: boolean;
  strong_id__: string;
  biography: string;
  biography_with_entities: BiographyWithEntities;
  external_url: string;
  has_biography_translation: boolean;
  category: null;
  is_category_tappable: boolean;
  is_business: boolean;
  professional_conversion_suggested_account_type: number;
  displayed_action_button_partner: null;
  smb_delivery_partner: null;
  smb_support_delivery_partner: null;
  displayed_action_button_type: null;
  is_call_to_action_enabled: null;
  num_of_admined_pages: null;
  page_id: null;
  page_name: null;
  ads_page_id: null;
  ads_page_name: null;
  shopping_post_onboard_nux_type: null;
  ads_incentive_expiration_date: null;
  account_badges: any[];
  additional_business_addresses: any[];
  auto_expand_chaining: boolean;
  bio_links: any[];
  birthday_today_visibility_for_viewer: string;
  can_use_branded_content_discovery_as_brand: boolean;
  can_use_branded_content_discovery_as_creator: boolean;
  can_use_paid_partnership_messaging_as_creator: boolean;
  chaining_results: Chaining[];
  chaining_suggestions: Chaining[];
  chaining_upsell_cards: any[];
  creator_shopping_info: CreatorShoppingInfo;
  fan_club_info: FanClubInfo;
  follow_friction_type: number;
  follower_count: number;
  following_count: number;
  has_anonymous_profile_picture: boolean;
  has_chaining: boolean;
  has_collab_collections: boolean;
  has_exclusive_feed_content: boolean;
  has_fan_club_subscriptions: boolean;
  has_highlight_reels: boolean;
  has_music_on_profile: boolean;
  has_private_collections: boolean;
  has_videos: boolean;
  hd_profile_pic_url_info: HDProfilePic;
  hd_profile_pic_versions: HDProfilePic[];
  highlights_tray_type: string;
  interop_messaging_user_fbid: number;
  is_bestie: boolean;
  is_creator_agent_enabled: boolean;
  is_eligible_for_meta_verified_enhanced_link_sheet: boolean;
  is_eligible_for_meta_verified_enhanced_link_sheet_consumption: boolean;
  is_eligible_for_meta_verified_multiple_addresses_creation: boolean;
  is_eligible_for_meta_verified_multiple_addresses_consumption: boolean;
  is_eligible_for_meta_verified_related_accounts: boolean;
  meta_verified_related_accounts_count: number;
  is_meta_verified_related_accounts_display_enabled: boolean;
  is_eligible_for_meta_verified_label: boolean;
  is_favorite: boolean;
  is_in_canada: boolean;
  is_interest_account: boolean;
  is_memorialized: boolean;
  is_potential_business: boolean;
  is_regulated_news_in_viewer_location: boolean;
  is_remix_setting_enabled_for_posts: boolean;
  is_remix_setting_enabled_for_reels: boolean;
  is_profile_broadcast_sharing_enabled: boolean;
  is_regulated_c18: boolean;
  is_stories_teaser_muted: boolean;
  is_recon_ad_cta_on_profile_eligible_with_viewer: boolean;
  is_supervision_features_enabled: boolean;
  is_verified: boolean;
  is_whatsapp_linked: boolean;
  latest_besties_reel_media: number;
  latest_reel_media: number;
  live_subscription_status: string;
  media_count: number;
  mutual_followers_count: number;
  nametag: Nametag;
  open_external_url_with_in_app_browser: boolean;
  pinned_channels_info: PinnedChannelsInfo;
  profile_context: string;
  profile_context_facepile_users: any[];
  profile_context_links_with_user_ids: any[];
  profile_pic_id: string;
  profile_pic_url: string;
  pronouns: string[];
  relevant_news_regulation_locations: any[];
  remove_message_entrypoint: boolean;
  show_schools_badge: null;
  text_app_last_visited_time: null;
  eligible_for_text_app_activation_badge: boolean;
  total_ar_effects: number;
  total_clips_count: number;
  total_igtv_videos: number;
  transparency_product_enabled: boolean;
  recs_from_friends: RecsFromFriends;
  adjusted_banners_order: any[];
  is_eligible_for_request_message: boolean;
  is_open_to_collab: boolean;
  profile_pic_url_signature: URLSignature;
}

export interface BiographyWithEntities {
  raw_text: string;
  entities: any[];
}

export interface Chaining {
  pk: string;
  pk_id: string;
  username: string;
  full_name: string;
  is_private: boolean;
  strong_id__: string;
  is_verified: boolean;
  profile_pic_id?: string;
  profile_pic_url?: string;
  chaining_info: ChainingInfo;
  profile_chaining_secondary_label: string;
  social_context: string;
  friendship_status: { [key: string]: boolean };
}

export interface ChainingInfo {
  sources: string;
  algorithm: null;
}

export interface CreatorShoppingInfo {
  linked_merchant_accounts: any[];
}

export interface FanClubInfo {
  fan_club_id: null;
  fan_club_name: null;
  is_fan_club_referral_eligible: null;
  fan_consideration_page_revamp_eligiblity: null;
  is_fan_club_gifting_eligible: null;
  subscriber_count: null;
  connected_member_count: null;
  autosave_to_exclusive_highlight: null;
  has_enough_subscribers_for_ssc: null;
}

export interface HDProfilePic {
  url: string;
  width: number;
  height: number;
  url_signature: URLSignature;
}

export interface URLSignature {
  expires: number;
  signature: string;
}

export interface Nametag {
  background_image_url: string;
  is_background_image_blurred: boolean;
}

export interface PinnedChannelsInfo {
  pinned_channels_list: any[];
  has_public_channels: boolean;
}

export interface RecsFromFriends {
  enable_recs_from_friends: boolean;
  recs_from_friends_entry_point_type: string;
}
