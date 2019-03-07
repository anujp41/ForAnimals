CREATE TABLE
IF NOT EXISTS "parents"
("id"   SERIAL , "name" VARCHAR
(255) NOT NULL, "street" VARCHAR
(255) NOT NULL, "city" VARCHAR
(255) NOT NULL, "state" VARCHAR
(255) NOT NULL, "zip" TEXT NOT NULL, "hasFoster" BOOLEAN DEFAULT false, "createdAt" TIMESTAMP
WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP
WITH TIME ZONE NOT NULL, PRIMARY KEY
("id"));
SELECT i.relname AS name, ix.indisprimary
AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg
(a.attnum) as column_indexes, array_agg
(a.attname) AS column_names, pg_get_indexdef
(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'parents' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
SELECT t.typname enum_name, array_agg(e.enumlabel
ORDER BY enumsortorder
) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_furbabies_currentStatus' GROUP BY 1;
SELECT t.typname enum_name, array_agg(e.enumlabel
ORDER BY enumsortorder
) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_furbabies_gender' GROUP BY 1;
SELECT t.typname enum_name, array_agg(e.enumlabel
ORDER BY enumsortorder
) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_furbabies_goodWithCats' GROUP BY 1;
SELECT t.typname enum_name, array_agg(e.enumlabel
ORDER BY enumsortorder
) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_furbabies_goodWithDogs' GROUP BY 1;
SELECT t.typname enum_name, array_agg(e.enumlabel
ORDER BY enumsortorder
) enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typname='enum_furbabies_goodWithChildren' GROUP BY 1;
CREATE TABLE
IF NOT EXISTS "furbabies"
("id"   SERIAL , "shelterName" VARCHAR
(255) NOT NULL DEFAULT '', "adoptedName" VARCHAR
(255) NOT NULL, "birthDate" TIMESTAMP
WITH TIME ZONE, "intakeDate" TIMESTAMP
WITH TIME ZONE, "currentStatus" "public"."enum_furbabies_currentStatus" NOT NULL, "size" VARCHAR
(255), "coatColor" VARCHAR
(255), "coatLength" VARCHAR
(255), "breed" VARCHAR
(255), "gender" "public"."enum_furbabies_gender" NOT NULL, "altered" BOOLEAN, "fivStatus" BOOLEAN DEFAULT false, "felvStatus" BOOLEAN DEFAULT false, "otherMedical" VARCHAR
(255) NOT NULL DEFAULT false, "behavioralIssues" VARCHAR
(255) NOT NULL, "goodWithCats" "public"."enum_furbabies_goodWithCats" NOT NULL DEFAULT 'Yes', "goodWithDogs" "public"."enum_furbabies_goodWithDogs" NOT NULL DEFAULT 'Yes', "goodWithChildren" "public"."enum_furbabies_goodWithChildren" NOT NULL DEFAULT 'Yes', "specialNeeds" VARCHAR
(255) DEFAULT 'N/A', "bio" VARCHAR
(1234), "addlComments" VARCHAR
(1234), "currentLocation" VARCHAR
(255), "courtesyListing" BOOLEAN NOT NULL DEFAULT false, "courtesyListLoc" VARCHAR
(255) DEFAULT 'N/A', "parentId" INTEGER REFERENCES "parents"
("id") ON
DELETE
SET NULL
ON
UPDATE CASCADE, "adoptionDate" TIMESTAMP
WITH TIME ZONE, "youtubeVid" VARCHAR
(255), "photoUrl" JSON, "microchipNum" VARCHAR
(255), "otherFilesURL" JSON[], "createdAt" TIMESTAMP
WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP
WITH TIME ZONE NOT NULL, PRIMARY KEY
("id"));
SELECT i.relname AS name, ix.indisprimary
AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg
(a.attnum) as column_indexes, array_agg
(a.attname) AS column_names, pg_get_indexdef
(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'furbabies' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
CREATE TABLE
IF NOT EXISTS "users"
("id"   SERIAL , "firstName" VARCHAR
(255) NOT NULL, "lastName" VARCHAR
(255) NOT NULL, "photoURL" VARCHAR
(255) DEFAULT 'https://firebasestorage.googleapis.com/v0/b/foranimalsinc-2b9a6.appspot.com/o/user%2Fdefault.jpg?alt=media&token=bbecd9fc-3853-47d3-856c-47e6f162c3ba', "email" VARCHAR
(255) NOT NULL UNIQUE, "password" VARCHAR
(255), "googleId" VARCHAR
(255), "hasAccess" BOOLEAN, "accessActionDate" TIMESTAMP
WITH TIME ZONE, "createdAt" TIMESTAMP
WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP
WITH TIME ZONE NOT NULL, PRIMARY KEY
("id"));
SELECT i.relname AS name, ix.indisprimary
AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg
(a.attnum) as column_indexes, array_agg
(a.attname) AS column_names, pg_get_indexdef
(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
CREATE TABLE
IF NOT EXISTS "resetPWLogs"
("resetToken" VARCHAR
(255) , "messageID" VARCHAR
(255) NOT NULL, "email" VARCHAR
(255) NOT NULL, "expiresOn" TIMESTAMP
WITH TIME ZONE NOT NULL, "tokenUsed" BOOLEAN DEFAULT false, "tokenUsedOn" TIMESTAMP
WITH TIME ZONE, "createdAt" TIMESTAMP
WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP
WITH TIME ZONE NOT NULL, PRIMARY KEY
("resetToken"));
SELECT i.relname AS name, ix.indisprimary
AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg
(a.attnum) as column_indexes, array_agg
(a.attname) AS column_names, pg_get_indexdef
(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'resetPWLogs' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;