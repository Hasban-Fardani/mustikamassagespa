PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_emdash_migrations" ("name" varchar(255) not null primary key, "timestamp" varchar(255) not null);
INSERT INTO _emdash_migrations VALUES('001_initial','2026-08-16T06:45:48.107Z');
INSERT INTO _emdash_migrations VALUES('002_media_status','2026-08-16T06:45:48.109Z');
INSERT INTO _emdash_migrations VALUES('003_schema_registry','2026-08-16T06:45:48.111Z');
INSERT INTO _emdash_migrations VALUES('004_plugins','2026-08-16T06:45:48.112Z');
INSERT INTO _emdash_migrations VALUES('005_menus','2026-08-16T06:45:48.114Z');
INSERT INTO _emdash_migrations VALUES('006_taxonomy_defs','2026-08-16T06:45:48.117Z');
INSERT INTO _emdash_migrations VALUES('007_widgets','2026-08-16T06:45:48.118Z');
INSERT INTO _emdash_migrations VALUES('008_auth','2026-08-16T06:45:48.121Z');
INSERT INTO _emdash_migrations VALUES('009_user_disabled','2026-08-16T06:45:48.122Z');
INSERT INTO _emdash_migrations VALUES('011_sections','2026-08-16T06:45:48.123Z');
INSERT INTO _emdash_migrations VALUES('012_search','2026-08-16T06:45:48.124Z');
INSERT INTO _emdash_migrations VALUES('013_scheduled_publishing','2026-08-16T06:45:48.124Z');
INSERT INTO _emdash_migrations VALUES('014_draft_revisions','2026-08-16T06:45:48.125Z');
INSERT INTO _emdash_migrations VALUES('015_indexes','2026-08-16T06:45:48.126Z');
INSERT INTO _emdash_migrations VALUES('016_api_tokens','2026-08-16T06:45:48.127Z');
INSERT INTO _emdash_migrations VALUES('017_authorization_codes','2026-08-16T06:45:48.128Z');
INSERT INTO _emdash_migrations VALUES('018_seo','2026-08-16T06:45:48.130Z');
INSERT INTO _emdash_migrations VALUES('019_i18n','2026-08-16T06:45:48.131Z');
INSERT INTO _emdash_migrations VALUES('020_collection_url_pattern','2026-08-16T06:45:48.131Z');
INSERT INTO _emdash_migrations VALUES('021_remove_section_categories','2026-08-16T06:45:48.133Z');
INSERT INTO _emdash_migrations VALUES('022_marketplace_plugin_state','2026-08-16T06:45:48.134Z');
INSERT INTO _emdash_migrations VALUES('023_plugin_metadata','2026-08-16T06:45:48.135Z');
INSERT INTO _emdash_migrations VALUES('024_media_placeholders','2026-08-16T06:45:48.136Z');
INSERT INTO _emdash_migrations VALUES('025_oauth_clients','2026-08-16T06:45:48.136Z');
INSERT INTO _emdash_migrations VALUES('026_cron_tasks','2026-08-16T06:45:48.137Z');
INSERT INTO _emdash_migrations VALUES('027_comments','2026-08-16T06:45:48.139Z');
INSERT INTO _emdash_migrations VALUES('028_drop_author_url','2026-08-16T06:45:48.141Z');
INSERT INTO _emdash_migrations VALUES('029_redirects','2026-08-16T06:45:48.142Z');
INSERT INTO _emdash_migrations VALUES('030_widen_scheduled_index','2026-08-16T06:45:48.142Z');
INSERT INTO _emdash_migrations VALUES('031_bylines','2026-08-16T06:45:48.144Z');
INSERT INTO _emdash_migrations VALUES('032_rate_limits','2026-08-16T06:45:48.145Z');
INSERT INTO _emdash_migrations VALUES('033_optimize_content_indexes','2026-08-16T06:45:48.147Z');
INSERT INTO _emdash_migrations VALUES('034_published_at_index','2026-08-16T06:45:48.147Z');
INSERT INTO _emdash_migrations VALUES('035_bounded_404_log','2026-08-16T06:45:48.149Z');
INSERT INTO _emdash_migrations VALUES('036_i18n_menus_and_taxonomies','2026-08-16T06:45:48.161Z');
INSERT INTO _emdash_migrations VALUES('037_credential_algorithm','2026-08-16T06:45:48.162Z');
INSERT INTO _emdash_migrations VALUES('038_registry_plugin_state','2026-08-16T06:45:48.164Z');
INSERT INTO _emdash_migrations VALUES('039_fix_fts5_triggers','2026-08-16T06:45:48.164Z');
INSERT INTO _emdash_migrations VALUES('040_byline_i18n','2026-08-16T06:45:48.169Z');
INSERT INTO _emdash_migrations VALUES('041_content_locale_list_index','2026-08-16T06:45:48.169Z');
INSERT INTO _emdash_migrations VALUES('042_byline_fields','2026-08-16T06:45:48.170Z');
INSERT INTO _emdash_migrations VALUES('043_content_references','2026-08-16T06:45:48.172Z');
INSERT INTO _emdash_migrations VALUES('044_comment_reactions','2026-08-16T06:45:48.173Z');
INSERT INTO _emdash_migrations VALUES('045_taxonomy_parent_group','2026-08-16T06:45:48.173Z');
INSERT INTO _emdash_migrations VALUES('046_media_usage_index','2026-08-16T06:45:48.174Z');
INSERT INTO _emdash_migrations VALUES('047_restore_taxonomy_parent_index','2026-08-16T06:45:48.174Z');
INSERT INTO _emdash_migrations VALUES('048_restore_content_taxonomies_term_index','2026-08-16T06:45:48.175Z');
INSERT INTO _emdash_migrations VALUES('049_taxonomies_name_locale_index','2026-08-16T06:45:48.175Z');
INSERT INTO _emdash_migrations VALUES('050_media_usage_index_status','2026-08-16T06:45:48.180Z');
INSERT INTO _emdash_migrations VALUES('051_content_taxonomies_denorm','2026-08-16T06:45:48.185Z');
INSERT INTO _emdash_migrations VALUES('052_media_usage_read_index','2026-08-16T06:45:48.185Z');
INSERT INTO _emdash_migrations VALUES('053_plugin_mcp_tools','2026-08-16T06:45:48.186Z');
CREATE TABLE IF NOT EXISTS "_emdash_migrations_lock" ("id" varchar(255) not null primary key, "is_locked" integer default 0 not null);
INSERT INTO _emdash_migrations_lock VALUES('migration_lock',0);
CREATE TABLE IF NOT EXISTS "revisions" ("id" text primary key, "collection" text not null, "entry_id" text not null, "data" text not null, "author_id" text, "created_at" text default (datetime('now')));
INSERT INTO revisions VALUES('01M04N3GH3EZR8XHZTSQ76AJRA','pages','01M04N3GH2RBHKFXKKF8WQWXBP','{"title":"Mustika Massage Spa","content":[{"_type":"marketing.hero","_key":"home-hero","headline":"Pijat profesional untuk","emphasis":"tubuh yang butuh jeda.","subheadline":"Sampaikan bagian tubuh yang terasa pegal. Kami bantu pilihkan sesi yang sesuai di Bandung.","primaryCtaLabel":"Booking via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","secondaryCtaLabel":"Lihat ritual kami","secondaryCtaUrl":"#rituals","location":"Bandung, Jawa Barat","audienceLabel":"Untuk pelanggan umum dan keluarga"},{"_type":"mustika.intro","_key":"home-intro","headline":"Tubuh tidak selalu minta lebih.","emphasis":"Kadang ia minta jeda.","body":"Mustika memberi ruang untuk melepas pegal dan menenangkan pikiran. Pilih sesi yang sesuai, lalu biarkan tubuh beristirahat.","audience":"Badan terasa pegal setelah aktivitas\nIngin istirahat tanpa terburu-buru\nMencari sesi untuk keluarga","linkLabel":"Lihat pilihan perawatan","linkUrl":"#rituals"},{"_type":"marketing.features","_key":"home-rituals","headline":"Pilih sesi yang sesuai","emphasis":"hari ini.","subheadline":"Beri tahu bagian tubuh yang paling membutuhkan perhatian.","features":[{"icon":"heart","title":"Traditional Massage","tag":"Untuk badan yang pegal","description":"Pijat tradisional untuk melepas pegal setelah hari yang panjang."},{"icon":"star","title":"Aromatherapy Massage","tag":"Untuk suasana yang tenang","description":"Sentuhan lembut dengan aroma yang membantu suasana terasa lebih tenang."},{"icon":"users","title":"Full Body Massage","tag":"Untuk perhatian menyeluruh","description":"Pijat seluruh tubuh ketika rasanya semua bagian perlu diperhatikan."},{"icon":"clock","title":"Wellness Therapy","tag":"Untuk kebutuhan yang lebih personal","description":"Sesi yang disesuaikan dengan kebutuhan tubuh."}]},{"_type":"mustika.experience","_key":"home-experience","headline":"Datang dengan lelah.","emphasis":"Pulang lebih ringan.","body":"Ceritakan bagian tubuh yang terasa pegal. Terapis menyesuaikan sesi dengan kebutuhan Anda.","steps":[{"number":"01","title":"Ceritakan kebutuhan","text":"Ceritakan bagian tubuh yang terasa paling membutuhkan perhatian."},{"number":"02","title":"Kami sesuaikan sesi","text":"Terapis membantu menyesuaikan pilihan perawatan dengan kebutuhanmu."},{"number":"03","title":"Nikmati waktu setelahnya","text":"Selesai sesi, beri tubuh waktu untuk beristirahat sebelum kembali beraktivitas."}]},{"_type":"mustika.standards","_key":"home-standards","headline":"Hal kecil yang kami perhatikan","emphasis":"sejak awal.","body":"Dari sapaan pertama hingga waktu untuk pulang, kami ingin sesi terasa tenang dan personal.","quote":"Kalau ada bagian yang terasa kurang nyaman, beri tahu kami. Sesi bisa disesuaikan.","items":[{"text":"Terapis profesional"},{"text":"Pengalaman yang personal"},{"text":"Ruang bersih dan nyaman"},{"text":"Untuk tubuh dan pikiran"}]},{"_type":"marketing.faq","_key":"home-faq","headline":"Ruang untuk semua pertanyaan.","items":[{"question":"Bagaimana cara melakukan booking?","answer":"Chat WhatsApp Mustika di 0812 2273 9180. Tulis layanan dan waktu yang diinginkan; admin akan mengecek ketersediaannya."},{"question":"Siapa yang bisa datang ke Mustika?","answer":"Mustika terbuka untuk pelanggan umum dan keluarga yang membutuhkan pijat, refleksi, atau waktu untuk beristirahat. Ceritakan kebutuhan khusus saat booking."},{"question":"Layanan apa saja yang tersedia?","answer":"Mustika menyediakan pijat tradisional, pijat aromaterapi, pijat seluruh tubuh, dan wellness therapy. Admin dapat membantu memilihkan sesi yang sesuai."},{"question":"Di mana lokasi Mustika?","answer":"Mustika Massage Spa berada di Bandung, Jawa Barat. Detail lokasi dan arahan perjalanan dapat dikonfirmasi langsung melalui WhatsApp saat melakukan booking."}]},{"_type":"mustika.booking","_key":"home-booking","headline":"Satu pesan kecil.","emphasis":"Waktu untuk beristirahat.","body":"Chat Mustika untuk memilih sesi dan waktu yang sesuai di Bandung.","ctaLabel":"Mulai booking","ctaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","phone":"0812 2273 9180"}]}',NULL,'2026-08-16 06:45:48');
INSERT INTO revisions VALUES('01M04N3GHK26HSVXJWDV4K4RV4','pages','01M04N3GHKP17BASQNBFQB4RA5','{"title":"Ritual Perawatan","content":[{"_type":"marketing.hero","_key":"ritual-hero","headline":"Pilih sesi yang sesuai","emphasis":"untuk hari ini.","subheadline":"Belum yakin harus memilih yang mana? Ceritakan kebutuhan lewat WhatsApp. Admin membantu mengecek pilihan dan jadwal.","primaryCtaLabel":"Tanya via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20tanya%20tentang%20layanan%20massage.","centered":true},{"_type":"marketing.features","_key":"ritual-options","headline":"Pilihan perawatan","subheadline":"Mulai dari bagian tubuh yang paling ingin diistirahatkan.","features":[{"icon":"heart","title":"Traditional Massage","tag":"","description":"Pijat tradisional untuk melepas pegal setelah hari yang panjang."},{"icon":"star","title":"Aromatherapy Massage","tag":"","description":"Sentuhan lembut dengan aroma yang membantu suasana terasa lebih tenang."},{"icon":"users","title":"Full Body Massage","tag":"","description":"Pijat seluruh tubuh ketika rasanya semua bagian perlu diperhatikan."},{"icon":"clock","title":"Wellness Therapy","tag":"","description":"Sesi yang disesuaikan dengan kebutuhan tubuh."}]}]}',NULL,'2026-08-16 06:45:48');
INSERT INTO revisions VALUES('01M04N3GHMH6653464462FY0MR','pages','01M04N3GHM4WT1HMXRY3R25NA7','{"title":"Booking Mustika","content":[{"_type":"marketing.hero","_key":"contact-hero","headline":"Mari beri tubuh waktu untuk","emphasis":"beristirahat.","subheadline":"Chat WhatsApp Mustika. Ceritakan kebutuhan dan waktu yang diinginkan; admin akan membantu mengecek jadwal.","primaryCtaLabel":"Chat langsung via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","location":"Bandung, Jawa Barat","centered":true}]}',NULL,'2026-08-16 06:45:48');
CREATE TABLE IF NOT EXISTS "media" ("id" text primary key, "filename" text not null, "mime_type" text not null, "size" integer, "width" integer, "height" integer, "alt" text, "caption" text, "storage_key" text not null, "content_hash" text, "created_at" text default (datetime('now')), "author_id" text, "status" text default 'ready' not null, blurhash TEXT, dominant_color TEXT);
CREATE TABLE IF NOT EXISTS "options" ("name" text primary key, "value" text not null);
INSERT INTO options VALUES('byline_fields_version','0');
INSERT INTO options VALUES('site:title','"Mustika Massage Spa"');
INSERT INTO options VALUES('site:tagline','"Pijat, refleksi, dan wellness di Bandung untuk pelanggan umum dan keluarga. Cek layanan dan jadwal lewat WhatsApp."');
INSERT INTO options VALUES('emdash:exclusive_hook:comment:moderate','"emdash-default-comment-moderator"');
CREATE TABLE IF NOT EXISTS "audit_logs" ("id" text primary key, "timestamp" text default (datetime('now')), "actor_id" text, "actor_ip" text, "action" text not null, "resource_type" text, "resource_id" text, "details" text, "status" text);
CREATE TABLE IF NOT EXISTS "_emdash_collections" ("id" text primary key, "slug" text not null unique, "label" text not null, "label_singular" text, "description" text, "icon" text, "supports" text, "source" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "search_config" text, has_seo INTEGER NOT NULL DEFAULT 0, url_pattern TEXT, "comments_enabled" integer default 0, "comments_moderation" text default 'first_time', "comments_closed_after_days" integer default 90, "comments_auto_approve_users" integer default 1);
INSERT INTO _emdash_collections VALUES('01M04N3GGXK4SAK6NM9N41B1GK','pages','Halaman','Halaman',NULL,NULL,'["drafts","revisions","seo"]','seed','2026-08-16 06:45:48','2026-08-16 06:45:48',NULL,1,NULL,0,'first_time',90,1);
CREATE TABLE IF NOT EXISTS "_emdash_fields" ("id" text primary key, "collection_id" text not null, "slug" text not null, "label" text not null, "type" text not null, "column_type" text not null, "required" integer default 0, "unique" integer default 0, "default_value" text, "validation" text, "widget" text, "options" text, "sort_order" integer default 0, "created_at" text default (datetime('now')), "searchable" integer default 0, translatable INTEGER NOT NULL DEFAULT 1, constraint "fields_collection_fk" foreign key ("collection_id") references "_emdash_collections" ("id") on delete cascade);
INSERT INTO _emdash_fields VALUES('01M04N3GGZVV69FYC8CZ56RBJN','01M04N3GGXK4SAK6NM9N41B1GK','title','Judul','string','TEXT',1,0,NULL,NULL,NULL,NULL,0,'2026-08-16 06:45:48',0,1);
INSERT INTO _emdash_fields VALUES('01M04N3GGZQY4XG9MHS7KDKKX5','01M04N3GGXK4SAK6NM9N41B1GK','content','Konten','portableText','JSON',0,0,NULL,NULL,NULL,NULL,1,'2026-08-16 06:45:48',0,1);
CREATE TABLE IF NOT EXISTS "_plugin_storage" ("plugin_id" text not null, "collection" text not null, "id" text not null, "data" text not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "pk_plugin_storage" primary key ("plugin_id", "collection", "id"));
CREATE TABLE IF NOT EXISTS "_plugin_state" ("plugin_id" text primary key, "version" text not null, "status" text default 'installed' not null, "installed_at" text default (datetime('now')), "activated_at" text, "deactivated_at" text, "data" text, source TEXT NOT NULL DEFAULT 'config', marketplace_version TEXT, display_name TEXT, description TEXT, registry_publisher_did TEXT, registry_slug TEXT, "mcp_tools_enabled" integer default 0 not null, "mcp_tools_consent" text);
CREATE TABLE IF NOT EXISTS "_plugin_indexes" ("plugin_id" text not null, "collection" text not null, "index_name" text not null, "fields" text not null, "created_at" text default (datetime('now')), constraint "pk_plugin_indexes" primary key ("plugin_id", "collection", "index_name"));
CREATE TABLE IF NOT EXISTS "_emdash_widget_areas" ("id" text primary key, "name" text not null unique, "label" text not null, "description" text, "created_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "_emdash_widgets" ("id" text primary key, "area_id" text not null references "_emdash_widget_areas" ("id") on delete cascade, "sort_order" integer default 0 not null, "type" text not null, "title" text, "content" text, "menu_name" text, "component_id" text, "component_props" text, "created_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "users" ("id" text primary key, "email" text not null unique, "name" text, "avatar_url" text, "role" integer default 10 not null, "email_verified" integer default 0 not null, "data" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), disabled INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS "credentials" ("id" text primary key, "user_id" text not null, "public_key" blob not null, "counter" integer default 0 not null, "device_type" text not null, "backed_up" integer default 0 not null, "transports" text, "name" text, "created_at" text default (datetime('now')), "last_used_at" text default (datetime('now')), "algorithm" integer default -7 not null, constraint "credentials_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "auth_tokens" ("hash" text primary key, "user_id" text, "email" text, "type" text not null, "role" integer, "invited_by" text, "expires_at" text not null, "created_at" text default (datetime('now')), constraint "auth_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade, constraint "auth_tokens_invited_by_fk" foreign key ("invited_by") references "users" ("id") on delete set null);
CREATE TABLE IF NOT EXISTS "oauth_accounts" ("provider" text not null, "provider_account_id" text not null, "user_id" text not null, "created_at" text default (datetime('now')), constraint "oauth_accounts_pk" primary key ("provider", "provider_account_id"), constraint "oauth_accounts_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "allowed_domains" ("domain" text primary key, "default_role" integer default 20 not null, "enabled" integer default 1 not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "auth_challenges" ("challenge" text primary key, "type" text not null, "user_id" text, "data" text, "expires_at" text not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_sections" ("id" text primary key, "slug" text not null unique, "title" text not null, "description" text, "keywords" text, "content" text not null, "preview_media_id" text, "source" text default 'user' not null, "theme_id" text, "created_at" text default CURRENT_TIMESTAMP, "updated_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "_emdash_api_tokens" ("id" text primary key, "name" text not null, "token_hash" text not null unique, "prefix" text not null, "user_id" text not null, "scopes" text not null, "expires_at" text, "last_used_at" text, "created_at" text default (datetime('now')), constraint "api_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_oauth_tokens" ("token_hash" text primary key, "token_type" text not null, "user_id" text not null, "scopes" text not null, "client_type" text default 'cli' not null, "expires_at" text not null, "refresh_token_hash" text, "created_at" text default (datetime('now')), client_id TEXT, constraint "oauth_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_device_codes" ("device_code" text primary key, "user_code" text not null unique, "scopes" text not null, "user_id" text, "status" text default 'pending' not null, "expires_at" text not null, "interval" integer default 5 not null, "created_at" text default (datetime('now')), "last_polled_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_authorization_codes" ("code_hash" text primary key, "client_id" text not null, "redirect_uri" text not null, "user_id" text not null, "scopes" text not null, "code_challenge" text not null, "code_challenge_method" text default 'S256' not null, "resource" text, "expires_at" text not null, "created_at" text default (datetime('now')), constraint "auth_codes_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_seo" ("collection" text not null, "content_id" text not null, "seo_title" text, "seo_description" text, "seo_image" text, "seo_canonical" text, "seo_no_index" integer default 0 not null, "created_at" text default (datetime('now')) not null, "updated_at" text default (datetime('now')) not null, constraint "_emdash_seo_pk" primary key ("collection", "content_id"));
CREATE TABLE IF NOT EXISTS "_emdash_oauth_clients" ("id" text primary key, "name" text not null, "redirect_uris" text not null, "scopes" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_cron_tasks" ("id" text primary key, "plugin_id" text not null, "task_name" text not null, "schedule" text not null, "is_oneshot" integer default 0 not null, "data" text, "next_run_at" text not null, "last_run_at" text, "status" text default 'idle' not null, "locked_at" text, "enabled" integer default 1 not null, "created_at" text default (datetime('now')), constraint "uq_cron_tasks_plugin_task" unique ("plugin_id", "task_name"));
CREATE TABLE IF NOT EXISTS "_emdash_comments" ("id" text primary key, "collection" text not null, "content_id" text not null, "parent_id" text references "_emdash_comments" ("id") on delete cascade, "author_name" text not null, "author_email" text not null, "author_user_id" text references "users" ("id") on delete set null, "body" text not null, "status" text default 'pending' not null, "ip_hash" text, "user_agent" text, "moderation_metadata" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_redirects" ("id" text primary key, "source" text not null, "destination" text not null, "type" integer default 301 not null, "is_pattern" integer default 0 not null, "enabled" integer default 1 not null, "hits" integer default 0 not null, "last_hit_at" text, "group_name" text, "auto" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_404_log" ("id" text primary key, "path" text not null, "referrer" text, "user_agent" text, "ip" text, "created_at" text default (datetime('now')), "hits" integer default 1 not null, "last_seen_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_rate_limits" ("key" text not null, "window" text not null, "count" integer default 1 not null, constraint "pk_rate_limits" primary key ("key", "window"));
CREATE TABLE IF NOT EXISTS "content_taxonomies" ("collection" text not null, "entry_id" text not null, "taxonomy_id" text not null, "status" TEXT, "scheduled_at" TEXT, "deleted_at" TEXT, "locale" TEXT, "published_at" TEXT, "created_at" TEXT, constraint "content_taxonomies_pk" primary key ("collection", "entry_id", "taxonomy_id"));
CREATE TABLE IF NOT EXISTS "_emdash_menu_items" ("id" text primary key, "menu_id" text not null, "parent_id" text, "sort_order" integer default 0 not null, "type" text not null, "reference_collection" text, "reference_id" text, "custom_url" text, "label" text not null, "title_attr" text, "target" text, "css_classes" text, "created_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text);
INSERT INTO _emdash_menu_items VALUES('01M04N3GHPGYP6WQ3QPDV86NEA','01M04N3GHN9VY7YSXPYG87Q2SX',NULL,0,'custom',NULL,NULL,'/#rituals','Ritual',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHPGYP6WQ3QPDV86NEA');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHPSPF6W4671GHHRT19','01M04N3GHN9VY7YSXPYG87Q2SX',NULL,1,'custom',NULL,NULL,'/#experience','Pengalaman',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHPSPF6W4671GHHRT19');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHPFJH4VVD0F25KCKMF','01M04N3GHN9VY7YSXPYG87Q2SX',NULL,2,'custom',NULL,NULL,'/#standards','Mengapa Mustika',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHPFJH4VVD0F25KCKMF');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHP986R93VS0PASNS01','01M04N3GHN9VY7YSXPYG87Q2SX',NULL,3,'custom',NULL,NULL,'/#faq','FAQ',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHP986R93VS0PASNS01');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHPZX06EEJ1EWKYE31C','01M04N3GHPFE9V3NJ2WY99XGSN',NULL,0,'custom',NULL,NULL,'/pricing','Pijat tradisional',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHPZX06EEJ1EWKYE31C');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHP2MAM5QES1WME54J8','01M04N3GHPFE9V3NJ2WY99XGSN',NULL,1,'custom',NULL,NULL,'/pricing','Pijat aromaterapi',NULL,NULL,NULL,'2026-08-16T06:45:48.214Z','en','01M04N3GHP2MAM5QES1WME54J8');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQNE638RRT7A5SST2F','01M04N3GHPFE9V3NJ2WY99XGSN',NULL,2,'custom',NULL,NULL,'/pricing','Pijat seluruh tubuh',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQNE638RRT7A5SST2F');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQCC6K9CMHJ7HBT0AN','01M04N3GHPFE9V3NJ2WY99XGSN',NULL,3,'custom',NULL,NULL,'/pricing','Wellness therapy',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQCC6K9CMHJ7HBT0AN');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQW57EW17C8K0KFZDF','01M04N3GHQ065MSDXGNVBXBCT6',NULL,0,'custom',NULL,NULL,'/#experience','Pengalaman Mustika',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQW57EW17C8K0KFZDF');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQ21FPW4C24XCGD6XE','01M04N3GHQ065MSDXGNVBXBCT6',NULL,1,'custom',NULL,NULL,'/#standards','Standar layanan',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQ21FPW4C24XCGD6XE');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQHE86JR08VTSW5H2A','01M04N3GHQ065MSDXGNVBXBCT6',NULL,2,'custom',NULL,NULL,'/#faq','Pertanyaan umum',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQHE86JR08VTSW5H2A');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQN8Q4QBD5QKFSGG8G','01M04N3GHQSCAE26GWE10071VR',NULL,0,'custom',NULL,NULL,'https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.','Chat via WhatsApp',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQN8Q4QBD5QKFSGG8G');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQMJ9K574F8A887A2W','01M04N3GHQSCAE26GWE10071VR',NULL,1,'custom',NULL,NULL,'tel:+6281222739180','Telepon 0812 2273 9180',NULL,NULL,NULL,'2026-08-16T06:45:48.215Z','en','01M04N3GHQMJ9K574F8A887A2W');
INSERT INTO _emdash_menu_items VALUES('01M04N3GHQRSG8K2TER2CFG0BJ','01M04N3GHQSCAE26GWE10071VR',NULL,2,'custom',NULL,NULL,'/contact','Lokasi Bandung',NULL,NULL,NULL,'2026-08-16T06:45:48.216Z','en','01M04N3GHQRSG8K2TER2CFG0BJ');
CREATE TABLE IF NOT EXISTS "_emdash_menus" ("id" text primary key, "name" text not null, "label" text not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_menus_name_locale_unique" unique ("name", "locale"));
INSERT INTO _emdash_menus VALUES('01M04N3GHN9VY7YSXPYG87Q2SX','primary','Navigasi Utama','2026-08-16T06:45:48.214Z','2026-08-16T06:45:48.214Z','en','01M04N3GHN9VY7YSXPYG87Q2SX');
INSERT INTO _emdash_menus VALUES('01M04N3GHPFE9V3NJ2WY99XGSN','footer_product','Layanan','2026-08-16T06:45:48.214Z','2026-08-16T06:45:48.214Z','en','01M04N3GHPFE9V3NJ2WY99XGSN');
INSERT INTO _emdash_menus VALUES('01M04N3GHQ065MSDXGNVBXBCT6','footer_company','Tentang Mustika','2026-08-16T06:45:48.215Z','2026-08-16T06:45:48.215Z','en','01M04N3GHQ065MSDXGNVBXBCT6');
INSERT INTO _emdash_menus VALUES('01M04N3GHQSCAE26GWE10071VR','footer_support','Hubungi','2026-08-16T06:45:48.215Z','2026-08-16T06:45:48.215Z','en','01M04N3GHQSCAE26GWE10071VR');
CREATE TABLE IF NOT EXISTS "taxonomies" ("id" text primary key, "name" text not null, "slug" text not null, "label" text not null, "parent_id" text, "data" text, "locale" text default 'en' not null, "translation_group" text, constraint "taxonomies_name_slug_locale_unique" unique ("name", "slug", "locale"), constraint "taxonomies_parent_fk" foreign key ("parent_id") references "taxonomies" ("id") on delete set null);
CREATE TABLE IF NOT EXISTS "_emdash_taxonomy_defs" ("id" text primary key, "name" text not null, "label" text not null, "label_singular" text, "hierarchical" integer default 0, "collections" text, "created_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_taxonomy_defs_name_locale_unique" unique ("name", "locale"));
INSERT INTO _emdash_taxonomy_defs VALUES('taxdef_category','category','Categories','Category',1,'["posts"]','2026-08-16 06:45:48','en','taxdef_category');
INSERT INTO _emdash_taxonomy_defs VALUES('taxdef_tag','tag','Tags','Tag',0,'["posts"]','2026-08-16 06:45:48','en','taxdef_tag');
CREATE TABLE IF NOT EXISTS "_emdash_content_bylines" ("id" text primary key, "collection_slug" text not null, "content_id" text not null, "byline_id" text not null, "sort_order" integer default 0 not null, "role_label" text, "created_at" text default (datetime('now')), constraint "content_bylines_unique" unique ("collection_slug", "content_id", "byline_id"));
CREATE TABLE IF NOT EXISTS "_emdash_bylines" ("id" text primary key, "slug" text not null, "display_name" text not null, "bio" text, "avatar_media_id" text references "media" ("id") on delete set null, "website_url" text, "user_id" text references "users" ("id") on delete set null, "is_guest" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_bylines_slug_locale_unique" unique ("slug", "locale"));
CREATE TABLE IF NOT EXISTS "_emdash_byline_fields" ("id" text primary key, "slug" text not null unique, "label" text not null, "type" text not null, "required" integer default 0 not null, "translatable" integer default 1 not null, "validation" text, "sort_order" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_byline_field_values" ("byline_id" text not null references "_emdash_bylines" ("id") on delete cascade, "field_id" text not null references "_emdash_byline_fields" ("id") on delete cascade, "value" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_byline_field_values_pk" primary key ("byline_id", "field_id"));
CREATE TABLE IF NOT EXISTS "_emdash_byline_field_group_values" ("translation_group" text not null, "field_id" text not null references "_emdash_byline_fields" ("id") on delete cascade, "value" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_byline_field_group_values_pk" primary key ("translation_group", "field_id"));
CREATE TABLE IF NOT EXISTS "_emdash_relations" ("id" text primary key, "name" text not null, "parent_collection" text not null, "child_collection" text not null, "parent_label" text not null, "child_label" text not null, "locale" text default 'en' not null, "translation_group" text not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_relations_name_locale_unique" unique ("name", "locale"));
CREATE TABLE IF NOT EXISTS "_emdash_content_references" ("id" text primary key, "relation_group" text not null, "parent_group" text not null, "child_group" text not null, "sort_order" integer default 0 not null, "created_at" text default (datetime('now')), constraint "content_references_unique" unique ("relation_group", "parent_group", "child_group"));
CREATE TABLE IF NOT EXISTS "_emdash_comment_reactions" ("id" text primary key, "comment_id" text not null references "_emdash_comments" ("id") on delete cascade, "reaction" text default 'like' not null, "voter_hash" text not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_sources" ("source_key" text primary key, "source_type" text not null, "collection_slug" text, "content_id" text, "source_variant" text not null, "locale" text, "translation_group" text, "content_slug" text, "content_title" text, "content_status" text, "content_scheduled_at" text, "content_deleted_at" text, "revision_id" text, "current_generation" text not null, "schema_version" integer default 1 not null, "indexed_at" text default (datetime('now')) not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "source_updated_at" text, "source_version" integer, "source_fingerprint" text, "source_completeness" text default 'unknown' not null, "last_attempted_at" text, "last_error_code" text);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage" ("id" text primary key, "source_key" text not null, "generation" text not null, "field_slug" text not null, "field_path" text not null, "occurrence_index" integer default 0 not null, "reference_type" text not null, "media_id" text, "provider" text default 'local' not null, "provider_asset_id" text not null, "media_kind" text, "mime_type" text, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_index_status" ("adapter_id" text not null, "scope_type" text not null, "scope_key" text not null, "status" text not null, "schema_version" integer default 1 not null, "started_at" text, "completed_at" text, "cursor" text, "indexed_source_count" integer default 0 not null, "failed_source_count" integer default 0 not null, "last_error_code" text, "updated_at" text default (datetime('now')) not null, constraint "_emdash_media_usage_index_status_pk" primary key ("adapter_id", "scope_type", "scope_key"));
INSERT INTO _emdash_media_usage_index_status VALUES('content-media','collection','pages','stale',1,NULL,NULL,NULL,0,0,'CONTENT_USAGE_STALE','2026-08-16T06:45:48.210Z');
CREATE TABLE IF NOT EXISTS "ec_pages" ("id" text primary key, "slug" text, "status" text default 'draft', "author_id" text, "primary_byline_id" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "published_at" text, "scheduled_at" text, "deleted_at" text, "version" integer default 1, "live_revision_id" text references "revisions" ("id"), "draft_revision_id" text references "revisions" ("id"), "locale" text default 'en' not null, "translation_group" text, "title" text default '' not null, "content" json, constraint "ec_pages_slug_locale_unique" unique ("slug", "locale"));
INSERT INTO ec_pages VALUES('01M04N3GH2RBHKFXKKF8WQWXBP','home','published',NULL,NULL,'2026-08-16T06:45:48.194Z','2026-08-16T06:45:48.195Z','2026-08-16T06:45:48.194Z',NULL,NULL,1,'01M04N3GH3EZR8XHZTSQ76AJRA',NULL,'en','01M04N3GH2RBHKFXKKF8WQWXBP','Mustika Massage Spa','[{"_type":"marketing.hero","_key":"home-hero","headline":"Pijat profesional untuk","emphasis":"tubuh yang butuh jeda.","subheadline":"Sampaikan bagian tubuh yang terasa pegal. Kami bantu pilihkan sesi yang sesuai di Bandung.","primaryCtaLabel":"Booking via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","secondaryCtaLabel":"Lihat ritual kami","secondaryCtaUrl":"#rituals","location":"Bandung, Jawa Barat","audienceLabel":"Untuk pelanggan umum dan keluarga"},{"_type":"mustika.intro","_key":"home-intro","headline":"Tubuh tidak selalu minta lebih.","emphasis":"Kadang ia minta jeda.","body":"Mustika memberi ruang untuk melepas pegal dan menenangkan pikiran. Pilih sesi yang sesuai, lalu biarkan tubuh beristirahat.","audience":"Badan terasa pegal setelah aktivitas\nIngin istirahat tanpa terburu-buru\nMencari sesi untuk keluarga","linkLabel":"Lihat pilihan perawatan","linkUrl":"#rituals"},{"_type":"marketing.features","_key":"home-rituals","headline":"Pilih sesi yang sesuai","emphasis":"hari ini.","subheadline":"Beri tahu bagian tubuh yang paling membutuhkan perhatian.","features":[{"icon":"heart","title":"Traditional Massage","tag":"Untuk badan yang pegal","description":"Pijat tradisional untuk melepas pegal setelah hari yang panjang."},{"icon":"star","title":"Aromatherapy Massage","tag":"Untuk suasana yang tenang","description":"Sentuhan lembut dengan aroma yang membantu suasana terasa lebih tenang."},{"icon":"users","title":"Full Body Massage","tag":"Untuk perhatian menyeluruh","description":"Pijat seluruh tubuh ketika rasanya semua bagian perlu diperhatikan."},{"icon":"clock","title":"Wellness Therapy","tag":"Untuk kebutuhan yang lebih personal","description":"Sesi yang disesuaikan dengan kebutuhan tubuh."}]},{"_type":"mustika.experience","_key":"home-experience","headline":"Datang dengan lelah.","emphasis":"Pulang lebih ringan.","body":"Ceritakan bagian tubuh yang terasa pegal. Terapis menyesuaikan sesi dengan kebutuhan Anda.","steps":[{"number":"01","title":"Ceritakan kebutuhan","text":"Ceritakan bagian tubuh yang terasa paling membutuhkan perhatian."},{"number":"02","title":"Kami sesuaikan sesi","text":"Terapis membantu menyesuaikan pilihan perawatan dengan kebutuhanmu."},{"number":"03","title":"Nikmati waktu setelahnya","text":"Selesai sesi, beri tubuh waktu untuk beristirahat sebelum kembali beraktivitas."}]},{"_type":"mustika.standards","_key":"home-standards","headline":"Hal kecil yang kami perhatikan","emphasis":"sejak awal.","body":"Dari sapaan pertama hingga waktu untuk pulang, kami ingin sesi terasa tenang dan personal.","quote":"Kalau ada bagian yang terasa kurang nyaman, beri tahu kami. Sesi bisa disesuaikan.","items":[{"text":"Terapis profesional"},{"text":"Pengalaman yang personal"},{"text":"Ruang bersih dan nyaman"},{"text":"Untuk tubuh dan pikiran"}]},{"_type":"marketing.faq","_key":"home-faq","headline":"Ruang untuk semua pertanyaan.","items":[{"question":"Bagaimana cara melakukan booking?","answer":"Chat WhatsApp Mustika di 0812 2273 9180. Tulis layanan dan waktu yang diinginkan; admin akan mengecek ketersediaannya."},{"question":"Siapa yang bisa datang ke Mustika?","answer":"Mustika terbuka untuk pelanggan umum dan keluarga yang membutuhkan pijat, refleksi, atau waktu untuk beristirahat. Ceritakan kebutuhan khusus saat booking."},{"question":"Layanan apa saja yang tersedia?","answer":"Mustika menyediakan pijat tradisional, pijat aromaterapi, pijat seluruh tubuh, dan wellness therapy. Admin dapat membantu memilihkan sesi yang sesuai."},{"question":"Di mana lokasi Mustika?","answer":"Mustika Massage Spa berada di Bandung, Jawa Barat. Detail lokasi dan arahan perjalanan dapat dikonfirmasi langsung melalui WhatsApp saat melakukan booking."}]},{"_type":"mustika.booking","_key":"home-booking","headline":"Satu pesan kecil.","emphasis":"Waktu untuk beristirahat.","body":"Chat Mustika untuk memilih sesi dan waktu yang sesuai di Bandung.","ctaLabel":"Mulai booking","ctaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","phone":"0812 2273 9180"}]');
INSERT INTO ec_pages VALUES('01M04N3GHKP17BASQNBFQB4RA5','pricing','published',NULL,NULL,'2026-08-16T06:45:48.211Z','2026-08-16T06:45:48.211Z','2026-08-16T06:45:48.211Z',NULL,NULL,1,'01M04N3GHK26HSVXJWDV4K4RV4',NULL,'en','01M04N3GHKP17BASQNBFQB4RA5','Ritual Perawatan','[{"_type":"marketing.hero","_key":"ritual-hero","headline":"Pilih sesi yang sesuai","emphasis":"untuk hari ini.","subheadline":"Belum yakin harus memilih yang mana? Ceritakan kebutuhan lewat WhatsApp. Admin membantu mengecek pilihan dan jadwal.","primaryCtaLabel":"Tanya via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20tanya%20tentang%20layanan%20massage.","centered":true},{"_type":"marketing.features","_key":"ritual-options","headline":"Pilihan perawatan","subheadline":"Mulai dari bagian tubuh yang paling ingin diistirahatkan.","features":[{"icon":"heart","title":"Traditional Massage","tag":"","description":"Pijat tradisional untuk melepas pegal setelah hari yang panjang."},{"icon":"star","title":"Aromatherapy Massage","tag":"","description":"Sentuhan lembut dengan aroma yang membantu suasana terasa lebih tenang."},{"icon":"users","title":"Full Body Massage","tag":"","description":"Pijat seluruh tubuh ketika rasanya semua bagian perlu diperhatikan."},{"icon":"clock","title":"Wellness Therapy","tag":"","description":"Sesi yang disesuaikan dengan kebutuhan tubuh."}]}]');
INSERT INTO ec_pages VALUES('01M04N3GHM4WT1HMXRY3R25NA7','contact','published',NULL,NULL,'2026-08-16T06:45:48.212Z','2026-08-16T06:45:48.212Z','2026-08-16T06:45:48.212Z',NULL,NULL,1,'01M04N3GHMH6653464462FY0MR',NULL,'en','01M04N3GHM4WT1HMXRY3R25NA7','Booking Mustika','[{"_type":"marketing.hero","_key":"contact-hero","headline":"Mari beri tubuh waktu untuk","emphasis":"beristirahat.","subheadline":"Chat WhatsApp Mustika. Ceritakan kebutuhan dan waktu yang diinginkan; admin akan membantu mengecek jadwal.","primaryCtaLabel":"Chat langsung via WhatsApp","primaryCtaUrl":"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.","location":"Bandung, Jawa Barat","centered":true}]');
CREATE TABLE _cf_METADATA (
        key INTEGER PRIMARY KEY,
        value BLOB
      );
INSERT INTO _cf_METADATA VALUES(2,1498);
CREATE INDEX "idx_revisions_entry" on "revisions" ("collection", "entry_id");
CREATE INDEX "idx_media_content_hash" on "media" ("content_hash");
CREATE INDEX "idx_audit_actor" on "audit_logs" ("actor_id");
CREATE INDEX "idx_audit_action" on "audit_logs" ("action");
CREATE INDEX "idx_audit_timestamp" on "audit_logs" ("timestamp");
CREATE INDEX "idx_media_status" on "media" ("status");
CREATE UNIQUE INDEX "idx_fields_collection_slug" on "_emdash_fields" ("collection_id", "slug");
CREATE INDEX "idx_fields_collection" on "_emdash_fields" ("collection_id");
CREATE INDEX "idx_fields_sort" on "_emdash_fields" ("collection_id", "sort_order");
CREATE INDEX "idx_plugin_storage_list" on "_plugin_storage" ("plugin_id", "collection", "created_at");
CREATE INDEX "idx_widgets_area" on "_emdash_widgets" ("area_id", "sort_order");
CREATE INDEX "idx_users_email" on "users" ("email");
CREATE INDEX "idx_credentials_user" on "credentials" ("user_id");
CREATE INDEX "idx_auth_tokens_email" on "auth_tokens" ("email");
CREATE INDEX "idx_oauth_accounts_user" on "oauth_accounts" ("user_id");
CREATE INDEX "idx_auth_challenges_expires" on "auth_challenges" ("expires_at");
CREATE INDEX "idx_users_disabled" on "users" ("disabled");
CREATE INDEX "idx_sections_source" on "_emdash_sections" ("source");
CREATE INDEX "idx_media_mime_type" on "media" ("mime_type");
CREATE INDEX "idx_media_filename" on "media" ("filename");
CREATE INDEX "idx_media_created_at" on "media" ("created_at");
CREATE INDEX "idx_audit_resource" on "audit_logs" ("resource_type", "resource_id");
CREATE INDEX "idx_api_tokens_token_hash" on "_emdash_api_tokens" ("token_hash");
CREATE INDEX "idx_api_tokens_user_id" on "_emdash_api_tokens" ("user_id");
CREATE INDEX "idx_oauth_tokens_user_id" on "_emdash_oauth_tokens" ("user_id");
CREATE INDEX "idx_oauth_tokens_expires" on "_emdash_oauth_tokens" ("expires_at");
CREATE INDEX "idx_auth_codes_expires" on "_emdash_authorization_codes" ("expires_at");
CREATE INDEX idx_emdash_seo_collection
		ON _emdash_seo (collection);
CREATE INDEX idx_plugin_state_source
		ON _plugin_state (source)
		WHERE source = 'marketplace';
CREATE INDEX "idx_cron_tasks_due" on "_emdash_cron_tasks" ("enabled", "status", "next_run_at");
CREATE INDEX "idx_cron_tasks_plugin" on "_emdash_cron_tasks" ("plugin_id");
CREATE INDEX "idx_comments_content" on "_emdash_comments" ("collection", "content_id", "status");
CREATE INDEX "idx_comments_parent" on "_emdash_comments" ("parent_id");
CREATE INDEX "idx_comments_status" on "_emdash_comments" ("status", "created_at");
CREATE INDEX "idx_comments_author_email" on "_emdash_comments" ("author_email");
CREATE INDEX "idx_comments_author_user" on "_emdash_comments" ("author_user_id");
CREATE INDEX "idx_redirects_source" on "_emdash_redirects" ("source");
CREATE INDEX "idx_redirects_enabled" on "_emdash_redirects" ("enabled");
CREATE INDEX "idx_redirects_group" on "_emdash_redirects" ("group_name");
CREATE INDEX "idx_404_log_created" on "_emdash_404_log" ("created_at");
CREATE INDEX "idx_rate_limits_window" on "_emdash_rate_limits" ("window");
CREATE INDEX idx_comments_pending
		ON _emdash_comments (id)
		WHERE status = 'pending';
CREATE INDEX idx_comments_approved
		ON _emdash_comments (id)
		WHERE status = 'approved';
CREATE INDEX idx_comments_spam
		ON _emdash_comments (id)
		WHERE status = 'spam';
CREATE INDEX idx_comments_trash
		ON _emdash_comments (id)
		WHERE status = 'trash';
CREATE UNIQUE INDEX "idx_404_log_path_unique" on "_emdash_404_log" ("path");
CREATE INDEX "idx_404_log_last_seen" on "_emdash_404_log" ("last_seen_at");
CREATE INDEX idx_content_taxonomies_term ON content_taxonomies(taxonomy_id);
CREATE INDEX "idx_menu_items_menu" on "_emdash_menu_items" ("menu_id", "sort_order");
CREATE INDEX "idx_menu_items_parent" on "_emdash_menu_items" ("parent_id");
CREATE INDEX "idx__emdash_menu_items_locale" on "_emdash_menu_items" ("locale");
CREATE INDEX "idx__emdash_menu_items_translation_group" on "_emdash_menu_items" ("translation_group");
CREATE INDEX "idx__emdash_menus_locale" on "_emdash_menus" ("locale");
CREATE INDEX "idx__emdash_menus_translation_group" on "_emdash_menus" ("translation_group");
CREATE INDEX "idx_taxonomies_locale" on "taxonomies" ("locale");
CREATE INDEX "idx_taxonomies_translation_group" on "taxonomies" ("translation_group");
CREATE INDEX "idx_taxonomies_parent" on "taxonomies" ("parent_id");
CREATE INDEX "idx__emdash_taxonomy_defs_locale" on "_emdash_taxonomy_defs" ("locale");
CREATE INDEX "idx__emdash_taxonomy_defs_translation_group" on "_emdash_taxonomy_defs" ("translation_group");
CREATE INDEX idx_plugin_state_registry
			ON _plugin_state (source)
			WHERE source = 'registry';
CREATE INDEX "idx_content_bylines_content" on "_emdash_content_bylines" ("collection_slug", "content_id", "sort_order");
CREATE INDEX "idx_content_bylines_byline" on "_emdash_content_bylines" ("byline_id");
CREATE INDEX "idx_bylines_slug" on "_emdash_bylines" ("slug");
CREATE INDEX "idx_bylines_display_name" on "_emdash_bylines" ("display_name");
CREATE UNIQUE INDEX "idx_bylines_user_id_locale_unique"
		ON "_emdash_bylines" (user_id, locale)
		WHERE user_id IS NOT NULL;
CREATE INDEX "idx__emdash_bylines_locale" on "_emdash_bylines" ("locale");
CREATE INDEX "idx__emdash_bylines_translation_group" on "_emdash_bylines" ("translation_group");
CREATE UNIQUE INDEX "idx_bylines_group_locale_unique"
		ON "_emdash_bylines" (translation_group, locale)
		WHERE translation_group IS NOT NULL;
CREATE INDEX "idx__emdash_byline_fields_sort_order" on "_emdash_byline_fields" ("sort_order");
CREATE INDEX "idx__emdash_byline_field_values_byline" on "_emdash_byline_field_values" ("byline_id");
CREATE INDEX "idx__emdash_byline_field_values_field" on "_emdash_byline_field_values" ("field_id");
CREATE INDEX "idx__emdash_byline_field_group_values_group" on "_emdash_byline_field_group_values" ("translation_group");
CREATE INDEX "idx__emdash_byline_field_group_values_field" on "_emdash_byline_field_group_values" ("field_id");
CREATE INDEX "idx__emdash_relations_locale" on "_emdash_relations" ("locale");
CREATE INDEX "idx__emdash_relations_translation_group" on "_emdash_relations" ("translation_group");
CREATE INDEX "idx__emdash_relations_parent_collection" on "_emdash_relations" ("parent_collection");
CREATE INDEX "idx__emdash_relations_child_collection" on "_emdash_relations" ("child_collection");
CREATE UNIQUE INDEX "idx__emdash_relations_group_locale_unique" on "_emdash_relations" ("translation_group", "locale");
CREATE INDEX "idx__emdash_content_references_parent" on "_emdash_content_references" ("parent_group", "relation_group", "sort_order");
CREATE INDEX "idx__emdash_content_references_child" on "_emdash_content_references" ("child_group", "relation_group");
CREATE INDEX "idx__emdash_content_references_relation" on "_emdash_content_references" ("relation_group");
CREATE UNIQUE INDEX "idx_comment_reactions_unique" on "_emdash_comment_reactions" ("comment_id", "voter_hash", "reaction");
CREATE INDEX "idx_comment_reactions_comment" on "_emdash_comment_reactions" ("comment_id");
CREATE INDEX "idx_comment_reactions_voter" on "_emdash_comment_reactions" ("voter_hash", "created_at");
CREATE INDEX "idx__emdash_media_usage_sources_content" on "_emdash_media_usage_sources" ("source_type", "collection_slug", "content_id");
CREATE INDEX "idx__emdash_media_usage_sources_variant" on "_emdash_media_usage_sources" ("source_type", "source_variant");
CREATE INDEX "idx__emdash_media_usage_sources_locale" on "_emdash_media_usage_sources" ("collection_slug", "locale");
CREATE INDEX "idx__emdash_media_usage_sources_deleted" on "_emdash_media_usage_sources" ("content_deleted_at");
CREATE INDEX "idx__emdash_media_usage_sources_translation_group" on "_emdash_media_usage_sources" ("collection_slug", "translation_group");
CREATE UNIQUE INDEX "idx__emdash_media_usage_unique_occurrence" on "_emdash_media_usage" ("source_key", "generation", "field_path", "occurrence_index");
CREATE INDEX "idx__emdash_media_usage_provider_asset" on "_emdash_media_usage" ("provider", "provider_asset_id");
CREATE INDEX "idx__emdash_media_usage_source_generation" on "_emdash_media_usage" ("source_key", "generation");
CREATE INDEX "idx_taxonomies_name_locale" on "taxonomies" ("name", "locale");
CREATE INDEX "idx__emdash_media_usage_sources_completeness" on "_emdash_media_usage_sources" ("source_type", "collection_slug", "source_completeness");
CREATE INDEX "idx__emdash_media_usage_sources_fingerprint" on "_emdash_media_usage_sources" ("source_fingerprint");
CREATE INDEX "idx__emdash_media_usage_index_status_status" on "_emdash_media_usage_index_status" ("adapter_id", "status");
CREATE INDEX "idx_content_taxonomies_pub"
			ON content_taxonomies (taxonomy_id, collection, deleted_at, published_at DESC, entry_id DESC);
CREATE INDEX "idx_content_taxonomies_crt"
			ON content_taxonomies (taxonomy_id, collection, deleted_at, created_at DESC, entry_id DESC);
CREATE INDEX "idx_content_taxonomies_loc_pub"
			ON content_taxonomies (taxonomy_id, collection, deleted_at, locale, published_at DESC, entry_id DESC);
CREATE INDEX "idx_content_taxonomies_loc_crt"
			ON content_taxonomies (taxonomy_id, collection, deleted_at, locale, created_at DESC, entry_id DESC);
CREATE INDEX "idx__emdash_media_usage_media_source_generation" on "_emdash_media_usage" ("media_id", "source_key", "generation");
CREATE INDEX "idx_ec_pages_slug"
			ON "ec_pages" (slug);
CREATE INDEX "idx_ec_pages_scheduled"
			ON "ec_pages" (scheduled_at)
			WHERE scheduled_at IS NOT NULL;
CREATE INDEX "idx_ec_pages_live_revision"
			ON "ec_pages" (live_revision_id);
CREATE INDEX "idx_ec_pages_draft_revision"
			ON "ec_pages" (draft_revision_id);
CREATE INDEX "idx_ec_pages_author"
			ON "ec_pages" (author_id);
CREATE INDEX "idx_ec_pages_primary_byline"
			ON "ec_pages" (primary_byline_id);
CREATE INDEX "idx_ec_pages_locale"
			ON "ec_pages" (locale);
CREATE INDEX "idx_ec_pages_translation_group"
			ON "ec_pages" (translation_group);
CREATE INDEX "idx_ec_pages_deleted_updated_id"
			ON "ec_pages" (deleted_at, updated_at DESC, id DESC);
CREATE INDEX "idx_ec_pages_deleted_status"
			ON "ec_pages" (deleted_at, status);
CREATE INDEX "idx_ec_pages_deleted_created_id"
			ON "ec_pages" (deleted_at, created_at DESC, id DESC);
CREATE INDEX "idx_ec_pages_deleted_published_id"
			ON "ec_pages" (deleted_at, published_at DESC, id DESC);
CREATE INDEX "idx_ec_pages_loc_upd"
			ON "ec_pages" (deleted_at, locale, updated_at DESC, id DESC);
CREATE INDEX "idx_ec_pages_loc_crt"
			ON "ec_pages" (deleted_at, locale, created_at DESC, id DESC);
COMMIT;
