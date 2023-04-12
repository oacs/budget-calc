import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const RecurringTransactionScalarFieldEnumSchema = z.enum(['id','userId','categoryId','type','frequency','startDate','endDate','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionCategoryScalarFieldEnumSchema = z.enum(['id','userId','name','type','createdAt','updatedAt']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','userId','categoryId','type','amount','description','transactionDate','recurringId','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const TypeTransactionSchema = z.enum(['EXPENSE','INCOME']);

export type TypeTransactionType = `${z.infer<typeof TypeTransactionSchema>}`

export const FrequencySchema = z.enum(['DAILY','WEEKLY','MONTHLY','YEARLY','NONE']);

export type FrequencyType = `${z.infer<typeof FrequencySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

// VERIFICATION TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const VerificationTokenOptionalDefaultsSchema = VerificationTokenSchema.merge(z.object({
}))

export type VerificationTokenOptionalDefaults = z.infer<typeof VerificationTokenOptionalDefaultsSchema>

/////////////////////////////////////////
// TRANSACTION CATEGORY SCHEMA
/////////////////////////////////////////

export const TransactionCategorySchema = z.object({
  type: TypeTransactionSchema,
  id: z.string().cuid(),
  userId: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TransactionCategory = z.infer<typeof TransactionCategorySchema>

// TRANSACTION CATEGORY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TransactionCategoryOptionalDefaultsSchema = TransactionCategorySchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TransactionCategoryOptionalDefaults = z.infer<typeof TransactionCategoryOptionalDefaultsSchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  type: TypeTransactionSchema,
  id: z.string().cuid(),
  userId: z.string(),
  categoryId: z.string().nullable(),
  amount: z.number(),
  description: z.string().nullable(),
  transactionDate: z.coerce.date(),
  recurringId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Transaction = z.infer<typeof TransactionSchema>

// TRANSACTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TransactionOptionalDefaultsSchema = TransactionSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TransactionOptionalDefaults = z.infer<typeof TransactionOptionalDefaultsSchema>

/////////////////////////////////////////
// RECURRING TRANSACTION SCHEMA
/////////////////////////////////////////

export const RecurringTransactionSchema = z.object({
  type: TypeTransactionSchema,
  frequency: FrequencySchema,
  id: z.string().cuid(),
  userId: z.string(),
  categoryId: z.string().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RecurringTransaction = z.infer<typeof RecurringTransactionSchema>

// RECURRING TRANSACTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RecurringTransactionOptionalDefaultsSchema = RecurringTransactionSchema.merge(z.object({
  frequency: FrequencySchema.optional(),
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RecurringTransactionOptionalDefaults = z.infer<typeof RecurringTransactionOptionalDefaultsSchema>
