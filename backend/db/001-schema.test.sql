PRAGMA writable_schema = 1;
delete from sqlite_master where type in ('table', 'index', 'trigger');
PRAGMA writable_schema = 0;

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `directus_migrations` (`version` varchar(255) not null, `name` varchar(255) not null, `timestamp` datetime default CURRENT_TIMESTAMP, primary key (`version`));
INSERT INTO directus_migrations VALUES('20201028A','Remove Collection Foreign Keys','2021-11-10 05:43:55');
INSERT INTO directus_migrations VALUES('20201029A','Remove System Relations','2021-11-10 05:43:55');
INSERT INTO directus_migrations VALUES('20201029B','Remove System Collections','2021-11-10 05:43:55');
INSERT INTO directus_migrations VALUES('20201029C','Remove System Fields','2021-11-10 05:43:55');
INSERT INTO directus_migrations VALUES('20201105A','Add Cascade System Relations','2021-11-10 05:43:56');
INSERT INTO directus_migrations VALUES('20201105B','Change Webhook URL Type','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210225A','Add Relations Sort Field','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210304A','Remove Locked Fields','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210312A','Webhooks Collections Text','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210331A','Add Refresh Interval','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210415A','Make Filesize Nullable','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210416A','Add Collections Accountability','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210422A','Remove Files Interface','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210506A','Rename Interfaces','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210510A','Restructure Relations','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210518A','Add Foreign Key Constraints','2021-11-10 05:43:57');
INSERT INTO directus_migrations VALUES('20210519A','Add System Fk Triggers','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210521A','Add Collections Icon Color','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210525A','Add Insights','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210608A','Add Deep Clone Config','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210626A','Change Filesize Bigint','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210716A','Add Conditions to Fields','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210721A','Add Default Folder','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210802A','Replace Groups','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210803A','Add Required to Fields','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210805A','Update Groups','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210805B','Change Image Metadata Structure','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210811A','Add Geometry Config','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210831A','Remove Limit Column','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210903A','Add Auth Provider','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210907A','Webhooks Collections Not Null','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210910A','Move Module Setup','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210920A','Webhooks URL Not Null','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210924A','Add Collection Organization','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210927A','Replace Fields Group','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210927B','Replace M2M Interface','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20210929A','Rename Login Action','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20211007A','Update Presets','2021-11-10 05:43:58');
INSERT INTO directus_migrations VALUES('20211009A','Add Auth Data','2021-11-10 05:43:59');
INSERT INTO directus_migrations VALUES('20211016A','Add Webhook Headers','2021-11-10 05:43:59');
INSERT INTO directus_migrations VALUES('20211103A','Set Unique to User Token','2021-11-10 05:43:59');
INSERT INTO directus_migrations VALUES('20211103B','Update Special Geometry','2021-11-10 05:43:59');
INSERT INTO directus_migrations VALUES('20211104A','Remove Collections Listing','2021-11-10 05:43:59');
INSERT INTO directus_migrations VALUES('20211118A','Add Notifications','2021-11-27 00:25:50');
INSERT INTO directus_migrations VALUES('20211211A','Add Shares','2022-01-06 01:43:57');
INSERT INTO directus_migrations VALUES('20211230A','Add Project Descriptor','2022-01-06 01:43:57');
CREATE TABLE IF NOT EXISTS "directus_activity" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `action` varchar(45) NOT NULL, `user` char(36), `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `ip` varchar(50) NOT NULL, `user_agent` varchar(255), `collection` varchar(64) NOT NULL, `item` varchar(255) NOT NULL, `comment` text);
CREATE TABLE IF NOT EXISTS "directus_folders" (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `parent` char(36), PRIMARY KEY (`id`), FOREIGN KEY (`parent`) REFERENCES `directus_folders` (`id`));
CREATE TABLE IF NOT EXISTS "directus_relations" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `many_collection` varchar(64) NOT NULL, `many_field` varchar(64) NOT NULL, `one_collection` varchar(64), `one_field` varchar(64), `one_collection_field` varchar(64), `one_allowed_collections` text, `junction_field` varchar(64), `sort_field` varchar(64), `one_deselect_action` varchar(255) NOT NULL DEFAULT 'nullify');
INSERT INTO directus_relations VALUES(3,'profile','user','directus_users',NULL,NULL,NULL,NULL,NULL,'nullify');
INSERT INTO directus_relations VALUES(4,'grocery_items','user','directus_users',NULL,NULL,NULL,NULL,NULL,'nullify');
CREATE TABLE IF NOT EXISTS "directus_revisions" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `activity` integer NOT NULL, `collection` varchar(64) NOT NULL, `item` varchar(255) NOT NULL, `data` json, `delta` json, `parent` integer, FOREIGN KEY (`parent`) REFERENCES `directus_revisions` (`id`), FOREIGN KEY (`activity`) REFERENCES `directus_activity` (`id`) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "directus_dashboards" (`id` char(36), `name` varchar(255) not null, `icon` varchar(30) not null default 'dashboard', `note` text, `date_created` datetime default CURRENT_TIMESTAMP, `user_created` char(36), foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, primary key (`id`));
CREATE TABLE IF NOT EXISTS "directus_panels" (`id` char(36), `dashboard` char(36) not null, `name` varchar(255), `icon` varchar(30) default 'insert_chart', `color` varchar(10), `show_header` boolean not null default '0', `note` text, `type` varchar(255) not null, `position_x` integer not null, `position_y` integer not null, `width` integer not null, `height` integer not null, `options` json, `date_created` datetime default CURRENT_TIMESTAMP, `user_created` char(36), foreign key(`dashboard`) references `directus_dashboards`(`id`) on delete CASCADE, foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, primary key (`id`));
CREATE TABLE IF NOT EXISTS "directus_files" (`id` char(36) NOT NULL, `storage` varchar(255) NOT NULL, `filename_disk` varchar(255), `filename_download` varchar(255) NOT NULL, `title` varchar(255), `type` varchar(255), `folder` char(36), `uploaded_by` char(36), `uploaded_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `modified_by` char(36), `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `charset` varchar(50), `filesize` bigint DEFAULT null, `width` integer, `height` integer, `duration` integer, `embed` varchar(200), `description` text, `location` text, `tags` text, `metadata` json, PRIMARY KEY (`id`), FOREIGN KEY (`uploaded_by`) REFERENCES `directus_users` (`id`), FOREIGN KEY (`modified_by`) REFERENCES `directus_users` (`id`), FOREIGN KEY (`folder`) REFERENCES `directus_folders` (`id`) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS "directus_settings" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `project_name` varchar(100) NOT NULL DEFAULT 'Directus', `project_url` varchar(255), `project_color` varchar(10) DEFAULT '#00C897', `project_logo` char(36), `public_foreground` char(36), `public_background` char(36), `public_note` text, `auth_login_attempts` integer DEFAULT '25', `auth_password_policy` varchar(100), `storage_asset_transform` varchar(7) DEFAULT 'all', `storage_asset_presets` json, `custom_css` text, `storage_default_folder` char(36), `basemaps` json, `mapbox_key` varchar(255), `module_bar` json, `project_descriptor` varchar(100) null, FOREIGN KEY (`project_logo`) REFERENCES `directus_files` (`id`), FOREIGN KEY (`public_foreground`) REFERENCES `directus_files` (`id`), FOREIGN KEY (`public_background`) REFERENCES `directus_files` (`id`), CONSTRAINT `directus_settings_storage_default_folder_foreign` FOREIGN KEY (`storage_default_folder`) REFERENCES `directus_folders` (`id`) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS "directus_permissions" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `role` char(36), `collection` varchar(64) NOT NULL, `action` varchar(10) NOT NULL, `permissions` json, `validation` json, `presets` json, `fields` text, FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE CASCADE);
INSERT INTO directus_permissions VALUES(27,'e821bb44-85aa-4153-9e6d-d03c65e871d5','profile','read','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(28,'e821bb44-85aa-4153-9e6d-d03c65e871d5','profile','create',NULL,'{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}',NULL,'id,name,user');
INSERT INTO directus_permissions VALUES(29,'e821bb44-85aa-4153-9e6d-d03c65e871d5','profile','update','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}',NULL,NULL,NULL);
INSERT INTO directus_permissions VALUES(30,'e821bb44-85aa-4153-9e6d-d03c65e871d5','profile','delete','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}',NULL,NULL,NULL);
INSERT INTO directus_permissions VALUES(31,'e821bb44-85aa-4153-9e6d-d03c65e871d5','profile','share','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}',NULL,NULL,NULL);
INSERT INTO directus_permissions VALUES(32,'e821bb44-85aa-4153-9e6d-d03c65e871d5','grocery_items','create','{}','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}',NULL,'*');
INSERT INTO directus_permissions VALUES(33,'e821bb44-85aa-4153-9e6d-d03c65e871d5','grocery_items','update','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(34,'e821bb44-85aa-4153-9e6d-d03c65e871d5','grocery_items','delete','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(35,'e821bb44-85aa-4153-9e6d-d03c65e871d5','grocery_items','share','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(36,'e821bb44-85aa-4153-9e6d-d03c65e871d5','grocery_items','read','{"_or":[{"user":{"id":{"_eq":"$CURRENT_USER"}}},{"user":{"_eq":"$CURRENT_USER"}}]}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(38,'e821bb44-85aa-4153-9e6d-d03c65e871d5','directus_users','update','{"id":{"_eq":"$CURRENT_USER"}}',NULL,NULL,'first_name,last_name,email,password,avatar,title,description,location,tags,theme,language,tfa_secret');
INSERT INTO directus_permissions VALUES(40,NULL,'directus_users','create','{}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(41,NULL,'directus_users','read','{}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(42,NULL,'directus_users','update','{}','{}',NULL,'*');
INSERT INTO directus_permissions VALUES(44,NULL,'directus_roles','read','{}','{}',NULL,'*');
CREATE TABLE IF NOT EXISTS "directus_users" (`id` char(36), `first_name` varchar(50), `last_name` varchar(50), `email` varchar(128), `password` varchar(255), `location` varchar(255), `title` varchar(50), `description` text, `tags` json, `avatar` char(36), `language` varchar(8) DEFAULT 'en-US', `theme` varchar(20) DEFAULT 'auto', `tfa_secret` varchar(255), `status` varchar(16) NOT NULL DEFAULT 'active', `role` char(36), `token` varchar(255), `last_access` datetime, `last_page` varchar(255), `provider` varchar(128) NOT NULL DEFAULT 'default', `external_identifier` varchar(255), `auth_data` json, `email_notifications` boolean default '1', PRIMARY KEY (`id`), FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE SET NULL);
INSERT INTO directus_users VALUES('c484ffcc-4aab-471a-9046-4bf2804b63ce',NULL,NULL,'admin@grapp.org','$argon2i$v=19$m=4096,t=3,p=1$ZHGW4npriDNG6lqDNW5fqg$HYar44OH5W32WplZFG6cTHa8pK6q+07r/BvyZiOilWU',NULL,NULL,NULL,NULL,NULL,'en-US','auto',NULL,'active','04faaa89-8546-4486-b492-10156cb5b6db',NULL,1641943454593,'/content/grocery_items','default',NULL,NULL,1);
INSERT INTO directus_users VALUES('33eb64ec-a4b3-4221-b7e4-a915977d1148','Test','User','testuser@test.org','$argon2i$v=19$m=4096,t=3,p=1$x9ao0K0FtLBNi4XE8feNWw$XmKr12Ze4ZV1nE2bw34Hssa3Nb5SoRVkJi9ZULwilyI',NULL,NULL,NULL,NULL,NULL,'en-US','auto',NULL,'active','e821bb44-85aa-4153-9e6d-d03c65e871d5',NULL,1641943663385,'/users/33eb64ec-a4b3-4221-b7e4-a915977d1148','default',NULL,NULL,1);
CREATE TABLE IF NOT EXISTS "directus_webhooks" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` varchar(255) NOT NULL, `method` varchar(10) NOT NULL DEFAULT 'POST', `url` text NOT NULL, `status` varchar(10) NOT NULL DEFAULT 'active', `data` boolean NOT NULL DEFAULT '1', `actions` varchar(100) NOT NULL, `collections` text NOT NULL, `headers` json);
CREATE TABLE IF NOT EXISTS "directus_collections" (`collection` varchar(64), `icon` varchar(30), `note` text, `display_template` varchar(255), `hidden` boolean NOT NULL DEFAULT '0', `singleton` boolean NOT NULL DEFAULT '0', `translations` json, `archive_field` varchar(64), `archive_app_filter` boolean NOT NULL DEFAULT '1', `archive_value` varchar(255), `unarchive_value` varchar(255), `sort_field` varchar(64), `accountability` varchar(255) DEFAULT 'all', `color` varchar(255) NULL, `item_duplication_fields` json NULL, `sort` integer, `group` varchar(64), `collapse` varchar(255) NOT NULL DEFAULT 'open', PRIMARY KEY (`collection`), FOREIGN KEY (`group`) REFERENCES `directus_collections` (`collection`));
INSERT INTO directus_collections VALUES('profile',NULL,NULL,NULL,0,0,NULL,NULL,1,NULL,NULL,NULL,'all',NULL,NULL,NULL,NULL,'open');
INSERT INTO directus_collections VALUES('grocery_items',NULL,NULL,NULL,0,0,NULL,NULL,1,NULL,NULL,NULL,'all',NULL,NULL,NULL,NULL,'open');
CREATE TABLE IF NOT EXISTS "directus_fields" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `collection` varchar(64) NOT NULL, `field` varchar(64) NOT NULL, `special` varchar(64), `interface` varchar(64), `options` json, `display` varchar(64), `display_options` json, `readonly` boolean NOT NULL DEFAULT '0', `hidden` boolean NOT NULL DEFAULT '0', `sort` integer, `width` varchar(30) DEFAULT 'full', `translations` json, `note` text, `conditions` json, `required` boolean DEFAULT '0', `group` varchar(64));
INSERT INTO directus_fields VALUES(1,'grocery_items','profile',NULL,'select-dropdown-m2o','{"template":"{{name}}","filter":null}','related-values','{"template":"{{name}}"}',0,0,5,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(30,'profile','user','m2o','select-dropdown-m2o','{"template":"{{email}}"}','related-values','{"template":"{{email}}"}',0,0,NULL,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(31,'grocery_items','id',NULL,NULL,NULL,NULL,NULL,0,0,1,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(32,'grocery_items','name',NULL,NULL,NULL,NULL,NULL,0,0,2,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(33,'grocery_items','quantity',NULL,'input',NULL,'raw',NULL,0,0,3,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(34,'grocery_items','unit',NULL,'input',NULL,'formatted-value',NULL,0,0,4,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(36,'profile','name',NULL,NULL,NULL,NULL,NULL,0,0,NULL,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(37,'profile','id',NULL,NULL,NULL,NULL,NULL,0,0,NULL,'full',NULL,NULL,NULL,0,NULL);
INSERT INTO directus_fields VALUES(38,'grocery_items','user','m2o','select-dropdown-m2o','{"template":"{{email}}"}','related-values','{"template":"{{email}}"}',0,0,6,'full',NULL,NULL,NULL,0,NULL);
CREATE TABLE IF NOT EXISTS "directus_presets" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `bookmark` varchar(255), `user` char(36), `role` char(36), `collection` varchar(64), `search` varchar(100), `layout` varchar(100) DEFAULT 'tabular', `layout_query` json, `layout_options` json, `refresh_interval` integer, `filter` json, FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE CASCADE, FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE CASCADE);
INSERT INTO directus_presets VALUES(1,NULL,'c484ffcc-4aab-471a-9046-4bf2804b63ce',NULL,'grocery_items',NULL,'tabular','{"tabular":{"page":1,"fields":["id","name","quantity","unit","profile","user"]}}','{"tabular":{"widths":{"id":94.02835083007812,"name":134.70098876953125,"quantity":148.3642578125,"unit":119.9779052734375,"profile":103.382568359375}}}',10,NULL);
INSERT INTO directus_presets VALUES(2,NULL,'c484ffcc-4aab-471a-9046-4bf2804b63ce',NULL,'profile',NULL,'tabular','{"tabular":{"page":1}}','{"tabular":{"widths":{"user":287.845703125}}}',NULL,NULL);
INSERT INTO directus_presets VALUES(4,NULL,'c484ffcc-4aab-471a-9046-4bf2804b63ce',NULL,'directus_users',NULL,'cards','{"cards":{"sort":["email"],"page":1}}','{"cards":{"icon":"account_circle","title":"{{ first_name }} {{ last_name }}","subtitle":"{{ email }}","size":4}}',NULL,NULL);
INSERT INTO directus_presets VALUES(6,NULL,'33eb64ec-a4b3-4221-b7e4-a915977d1148',NULL,'grocery_items',NULL,NULL,'{"tabular":{"fields":["id","name","quantity","unit","profile","user"],"page":1}}','{"tabular":{"widths":{"id":107.19210815429688}}}',NULL,NULL);
INSERT INTO directus_presets VALUES(7,NULL,'33eb64ec-a4b3-4221-b7e4-a915977d1148',NULL,'profile',NULL,NULL,'{"tabular":{"page":1}}','{"tabular":{"widths":{"user":261.47186279296875}}}',10,NULL);
INSERT INTO directus_presets VALUES(8,NULL,'33eb64ec-a4b3-4221-b7e4-a915977d1148',NULL,'directus_users',NULL,'cards','{"cards":{"sort":["email"],"page":1}}','{"cards":{"icon":"account_circle","title":"{{ first_name }} {{ last_name }}","subtitle":"{{ email }}","size":4}}',NULL,NULL);
CREATE TABLE IF NOT EXISTS "directus_roles" (`id` char(36), `name` varchar(100) NOT NULL, `icon` varchar(30) NOT NULL DEFAULT 'supervised_user_circle', `description` text, `ip_access` text, `enforce_tfa` boolean NOT NULL DEFAULT '0', `admin_access` boolean NOT NULL DEFAULT '0', `app_access` boolean NOT NULL DEFAULT '1', PRIMARY KEY (`id`));
INSERT INTO directus_roles VALUES('04faaa89-8546-4486-b492-10156cb5b6db','Administrator','verified','Initial administrative role with unrestricted App/API access',NULL,0,1,1);
INSERT INTO directus_roles VALUES('e821bb44-85aa-4153-9e6d-d03c65e871d5','AppUser','supervised_user_circle',NULL,NULL,0,0,1);
CREATE TABLE `directus_notifications` (`id` integer not null primary key autoincrement, `timestamp` datetime not null, `status` varchar(255) default 'inbox', `recipient` char(36) not null, `sender` char(36) not null, `subject` varchar(255) not null, `message` text, `collection` varchar(64), `item` varchar(255), foreign key(`recipient`) references `directus_users`(`id`) on delete CASCADE, foreign key(`sender`) references `directus_users`(`id`));
CREATE TABLE `directus_shares` (`id` char(36), `name` varchar(255), `collection` varchar(64), `item` varchar(255), `role` char(36), `password` varchar(255), `user_created` char(36), `date_created` datetime default CURRENT_TIMESTAMP, `date_start` datetime null default null, `date_end` datetime null default null, `times_used` integer default '0', `max_uses` integer, foreign key(`collection`) references `directus_collections`(`collection`) on delete CASCADE, foreign key(`role`) references `directus_roles`(`id`) on delete CASCADE, foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, primary key (`id`));
CREATE TABLE IF NOT EXISTS "directus_sessions" (`token` varchar(64) NOT NULL, `user` char(36), `expires` datetime NOT NULL, `ip` varchar(255), `user_agent` varchar(255), `share` char(36), PRIMARY KEY (`token`), FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE CASCADE, FOREIGN KEY (`share`) REFERENCES `directus_shares` (`id`) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "grocery_items" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` varchar(255) NULL, `quantity` integer NULL, `unit` varchar(255) NULL, `profile` integer NULL, `user` varchar(36) NOT NULL DEFAULT null, CONSTRAINT `grocery_items_profile_foreign` FOREIGN KEY (`profile`) REFERENCES `profile` (`id`) ON DELETE SET NULL, CONSTRAINT `grocery_items_user_foreign` FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL);
INSERT INTO grocery_items VALUES(1,'name1', 1, 'unit1', 2, '33eb64ec-a4b3-4221-b7e4-a915977d1148');
INSERT INTO grocery_items VALUES(2,'name2', 2, 'unit2', 2, '33eb64ec-a4b3-4221-b7e4-a915977d1148');
INSERT INTO grocery_items VALUES(3,'name3', 3, 'unit3', 2, '33eb64ec-a4b3-4221-b7e4-a915977d1148');
INSERT INTO grocery_items VALUES(4,'name4', 4, 'unit4', 2, '33eb64ec-a4b3-4221-b7e4-a915977d1148');
INSERT INTO grocery_items VALUES(5,'name5', 5, 'unit5', 2, '33eb64ec-a4b3-4221-b7e4-a915977d1148');

CREATE TABLE IF NOT EXISTS "profile" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` varchar(255) NULL DEFAULT null, `user` varchar(36) NOT NULL DEFAULT null, CONSTRAINT `profile_user_foreign` FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL);
INSERT INTO profile VALUES(1,'current','33eb64ec-a4b3-4221-b7e4-a915977d1148');
INSERT INTO profile VALUES(2,'jest','33eb64ec-a4b3-4221-b7e4-a915977d1148');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('directus_activity',1460);
INSERT INTO sqlite_sequence VALUES('directus_relations',4);
INSERT INTO sqlite_sequence VALUES('directus_revisions',1193);
INSERT INTO sqlite_sequence VALUES('directus_settings',0);
INSERT INTO sqlite_sequence VALUES('directus_permissions',44);
INSERT INTO sqlite_sequence VALUES('directus_webhooks',0);
INSERT INTO sqlite_sequence VALUES('directus_fields',38);
INSERT INTO sqlite_sequence VALUES('directus_presets',9);
INSERT INTO sqlite_sequence VALUES('grocery_items',20);
INSERT INTO sqlite_sequence VALUES('profile',29);
CREATE UNIQUE INDEX `directus_users_external_identifier_unique` on `directus_users` (`external_identifier`);
CREATE UNIQUE INDEX `directus_users_email_unique` on `directus_users` (`email`);
CREATE UNIQUE INDEX `directus_users_token_unique` on `directus_users` (`token`);
COMMIT;
.quit