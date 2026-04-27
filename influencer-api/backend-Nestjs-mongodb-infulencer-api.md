# Complete Influencer API with NestJS and MongoDB

A comprehensive guide to building a production-ready Influencer Management API using NestJS, MongoDB, and TypeScript.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Schema Design](#database-schema-design)
6. [Module Structure](#module-structure)
7. [Implementation Guide](#implementation-guide)
8. [API Endpoints](#api-endpoints)
9. [Testing](#testing)
10. [Deployment](#deployment)

---

## Project Overview

This API manages influencers, brands, campaigns, and collaborations. Features include:

- **Influencer Management**: Profile, social media stats, categories, rates
- **Brand Management**: Company profiles, campaign budgets
- **Campaign Management**: Create, track, and manage marketing campaigns
- **Collaboration Tracking**: Track partnerships between influencers and brands
- **Analytics**: Performance metrics and engagement rates
- **Authentication**: JWT-based auth with role-based access control

---

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher) or MongoDB Atlas account
- npm or yarn package manager
- Basic knowledge of TypeScript and NestJS

---

## Project Setup

### Step 1: Install NestJS CLI

```bash
npm install -g @nestjs/cli
```

### Step 2: Create New Project

```bash
nest new influencer-api
cd influencer-api
```

### Step 3: Install Dependencies

```bash
# Core dependencies
npm install @nestjs/mongoose mongoose @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer

# Development dependencies
npm install -D @types/passport-jwt @types/bcrypt @types/passport
```

---

## Environment Configuration

### Create `.env` file

Create a `.env` file in the root directory:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/influencer_db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer_db?retryWrites=true&w=majority

# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d
JWT_ISSUER=influencer-api

# Password Hashing
BCRYPT_ROUNDS=10

# File Upload (Optional)
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8080

# Logging
LOG_LEVEL=debug
```

### Create `.env.example` for version control

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/influencer_db

# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=change-me-in-production
JWT_EXPIRATION=7d
JWT_ISSUER=influencer-api

# Password Hashing
BCRYPT_ROUNDS=10

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=*

# Logging
LOG_LEVEL=debug
```

### Configure ConfigModule

Update `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InfluencerModule } from './influencer/influencer.module';
import { BrandModule } from './brand/brand.module';
import { CampaignModule } from './campaign/campaign.module';
import { CollaborationModule } from './collaboration/collaboration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    InfluencerModule,
    BrandModule,
    CampaignModule,
    CollaborationModule,
  ],
})
export class AppModule {}
```

---

## Database Schema Design

### 1. User Schema (Base for Authentication)

**File**: `src/auth/schemas/user.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  role: 'user' | 'influencer' | 'brand' | 'admin';

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### 2. Influencer Schema

**File**: `src/influencer/schemas/influencer.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export type InfluencerDocument = Influencer & Document;

@Schema({ timestamps: true })
export class Influencer {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  bio?: string;

  @Prop()
  profileImage?: string;

  @Prop()
  location?: string;

  @Prop({ required: true })
  categories: string[]; // e.g., ['Fashion', 'Tech', 'Lifestyle']

  @Prop({ required: true })
  followers: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
    twitter?: number;
    linkedin?: number;
  };

  @Prop({ required: true })
  engagementRate: number; // percentage

  @Prop()
  rates: {
    post?: number;
    story?: number;
    video?: number;
    campaign?: number;
  };

  @Prop({ default: 0 })
  totalCampaigns: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Collaboration' }] })
  collaborations: Types.ObjectId[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  socialLinks: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const InfluencerSchema = SchemaFactory.createForClass(Influencer);

// Index for better query performance
InfluencerSchema.index({ categories: 1 });
InfluencerSchema.index({ 'followers.instagram': -1 });
InfluencerSchema.index({ engagementRate: -1 });
InfluencerSchema.index({ isVerified: 1 });
```

### 3. Brand Schema

**File**: `src/brand/schemas/brand.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({ required: true })
  companyName: string;

  @Prop()
  logo?: string;

  @Prop()
  website?: string;

  @Prop()
  industry: string;

  @Prop()
  description?: string;

  @Prop()
  location?: string;

  @Prop({ required: true })
  budgetRange: {
    min: number;
    max: number;
  };

  @Prop({ default: 0 })
  totalCampaigns: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }] })
  campaigns: Types.ObjectId[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  contactEmail?: string;

  @Prop()
  contactPhone?: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.index({ industry: 1 });
BrandSchema.index({ 'budgetRange.min': 1 });
```

### 4. Campaign Schema

**File**: `src/campaign/schemas/campaign.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from '../../brand/schemas/brand.schema';

export type CampaignDocument = Campaign & Document;

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Brand;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  budget: number;

  @Prop({ type: String, enum: CampaignStatus, default: CampaignStatus.DRAFT })
  status: CampaignStatus;

  @Prop({ required: true })
  requirements: {
    platforms: string[];
    deliverables: string[];
    targetAudience?: string;
    keywords?: string[];
  };

  @Prop()
  metrics: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    engagement?: number;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Collaboration' }] })
  collaborations: Types.ObjectId[];

  @Prop({ default: 0 })
  totalReach?: number;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);

CampaignSchema.index({ status: 1 });
CampaignSchema.index({ startDate: -1, endDate: -1 });
CampaignSchema.index({ brand: 1 });
```

### 5. Collaboration Schema

**File**: `src/collaboration/schemas/collaboration.schema.ts`

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Influencer } from '../../influencer/schemas/influencer.schema';
import { Campaign } from '../../campaign/schemas/campaign.schema';

export type CollaborationDocument = Collaboration & Document;

export enum CollaborationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Collaboration {
  @Prop({ type: Types.ObjectId, ref: 'Influencer', required: true })
  influencer: Influencer;

  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaign: Campaign;

  @Prop({ required: true })
  agreedAmount: number;

  @Prop({ type: String, enum: CollaborationStatus, default: CollaborationStatus.PENDING })
  status: CollaborationStatus;

  @Prop()
  deliverables: {
    type: string;
    platform: string;
    dueDate: Date;
    completedDate?: Date;
    url?: string;
  }[];

  @Prop()
  notes?: string;

  @Prop({ default: 0 })
  rating?: number;

  @Prop()
  review?: string;

  @Prop()
  paymentStatus: 'pending' | 'paid' | 'partial';

  @Prop()
  paymentDate?: Date;
}

export const CollaborationSchema = SchemaFactory.createForClass(Collaboration);

CollaborationSchema.index({ influencer: 1, status: 1 });
CollaborationSchema.index({ campaign: 1 });
CollaborationSchema.index({ status: 1 });
```

---

## Module Structure

```
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interceptors/
│       └── transform.interceptor.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── login.dto.ts
│   │   └── refresh-token.dto.ts
│   └── schemas/
│       └── user.schema.ts
├── influencer/
│   ├── influencer.module.ts
│   ├── influencer.controller.ts
│   ├── influencer.service.ts
│   ├── dto/
│   │   ├── create-influencer.dto.ts
│   │   ├── update-influencer.dto.ts
│   │   └── filter-influencer.dto.ts
│   └── schemas/
│       └── influencer.schema.ts
├── brand/
│   ├── brand.module.ts
│   ├── brand.controller.ts
│   ├── brand.service.ts
│   ├── dto/
│   │   ├── create-brand.dto.ts
│   │   └── update-brand.dto.ts
│   └── schemas/
│       └── brand.schema.ts
├── campaign/
│   ├── campaign.module.ts
│   ├── campaign.controller.ts
│   ├── campaign.service.ts
│   ├── dto/
│   │   ├── create-campaign.dto.ts
│   │   ├── update-campaign.dto.ts
│   │   └── filter-campaign.dto.ts
│   └── schemas/
│       └── campaign.schema.ts
└── collaboration/
    ├── collaboration.module.ts
    ├── collaboration.controller.ts
    ├── collaboration.service.ts
    ├── dto/
    │   ├── create-collaboration.dto.ts
    │   └── update-collaboration.dto.ts
    └── schemas/
        └── collaboration.schema.ts
```

---

## Implementation Guide

### 1. Common Guards and Decorators

**File**: `src/common/decorators/roles.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

**File**: `src/common/guards/jwt-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**File**: `src/common/guards/roles.guard.ts`

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### 2. Auth Module

**File**: `src/auth/auth.service.ts`

```typescript
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(this.configService.get('BCRYPT_ROUNDS') || '10'),
    );

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLogin = new Date();
    await user.save();

    return this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
      issuer: this.configService.get('JWT_ISSUER'),
    });

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }
}
```

**File**: `src/auth/auth.controller.ts`

```typescript
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

### 3. Influencer Module

**File**: `src/influencer/influencer.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Influencer, InfluencerDocument } from './schemas/influencer.schema';
import { CreateInfluencerDto } from './dto/create-influencer.dto';
import { UpdateInfluencerDto } from './dto/update-influencer.dto';
import { FilterInfluencerDto } from './dto/filter-influencer.dto';

@Injectable()
export class InfluencerService {
  constructor(
    @InjectModel(Influencer.name) private influencerModel: Model<InfluencerDocument>,
  ) {}

  async create(createInfluencerDto: CreateInfluencerDto, userId: string) {
    const existingInfluencer = await this.influencerModel.findOne({ user: userId });
    
    if (existingInfluencer) {
      throw new BadRequestException('Influencer profile already exists');
    }

    const totalFollowers = Object.values(createInfluencerDto.followers).reduce(
      (sum, count) => sum + (count || 0),
      0,
    );

    const influencer = await this.influencerModel.create({
      ...createInfluencerDto,
      user: userId,
    });

    return influencer.populate('user', '-password');
  }

  async findAll(filterDto: FilterInfluencerDto) {
    const query: FilterQuery<Influencer> = {};

    if (filterDto.categories) {
      query.categories = { $in: filterDto.categories.split(',') };
    }

    if (filterDto.minFollowers) {
      query['followers.instagram'] = { $gte: parseInt(filterDto.minFollowers) };
    }

    if (filterDto.minEngagementRate) {
      query.engagementRate = { $gte: parseFloat(filterDto.minEngagementRate) };
    }

    if (filterDto.isVerified) {
      query.isVerified = filterDto.isVerified === 'true';
    }

    if (filterDto.location) {
      query.location = new RegExp(filterDto.location, 'i');
    }

    const page = parseInt(filterDto.page) || 1;
    const limit = parseInt(filterDto.limit) || 10;
    const skip = (page - 1) * limit;

    const [influencers, total] = await Promise.all([
      this.influencerModel
        .find(query)
        .populate('user', '-password')
        .sort({ 'followers.instagram': -1 })
        .skip(skip)
        .limit(limit),
      this.influencerModel.countDocuments(query),
    ]);

    return {
      data: influencers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const influencer = await this.influencerModel
      .findById(id)
      .populate('user', '-password')
      .populate('collaborations');

    if (!influencer) {
      throw new NotFoundException(`Influencer with ID ${id} not found`);
    }

    return influencer;
  }

  async update(id: string, updateInfluencerDto: UpdateInfluencerDto) {
    const influencer = await this.influencerModel.findByIdAndUpdate(
      id,
      updateInfluencerDto,
      { new: true, runValidators: true },
    ).populate('user', '-password');

    if (!influencer) {
      throw new NotFoundException(`Influencer with ID ${id} not found`);
    }

    return influencer;
  }

  async remove(id: string) {
    const result = await this.influencerModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Influencer with ID ${id} not found`);
    }

    return { message: 'Influencer deleted successfully' };
  }

  async getTopInfluencers(category?: string, limit = 10) {
    const query: FilterQuery<Influencer> = { isVerified: true };
    
    if (category) {
      query.categories = category;
    }

    return this.influencerModel
      .find(query)
      .populate('user', '-password')
      .sort({ 'followers.instagram': -1, engagementRate: -1 })
      .limit(limit);
  }

  async calculateEngagementRate(influencerId: string) {
    const influencer = await this.influencerModel.findById(influencerId);
    
    if (!influencer) {
      throw new NotFoundException(`Influencer with ID ${influencerId} not found`);
    }

    const totalFollowers = Object.values(influencer.followers).reduce(
      (sum, count) => sum + (count || 0),
      0,
    );

    // This is a simplified calculation - in real scenario, you'd fetch actual engagement data
    const avgEngagement = influencer.totalCampaigns > 0 
      ? (influencer.averageRating / 5) * 100 
      : 0;

    influencer.engagementRate = avgEngagement;
    await influencer.save();

    return { engagementRate: avgEngagement };
  }
}
```

**File**: `src/influencer/influencer.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { CreateInfluencerDto } from './dto/create-influencer.dto';
import { UpdateInfluencerDto } from './dto/update-influencer.dto';
import { FilterInfluencerDto } from './dto/filter-influencer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('influencers')
export class InfluencerController {
  constructor(private influencerService: InfluencerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('influencer')
  async create(@Request() req, @Body() createInfluencerDto: CreateInfluencerDto) {
    return this.influencerService.create(createInfluencerDto, req.user.sub);
  }

  @Get()
  async findAll(@Query() filterDto: FilterInfluencerDto) {
    return this.influencerService.findAll(filterDto);
  }

  @Get('top')
  async getTopInfluencers(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
  ) {
    return this.influencerService.getTopInfluencers(
      category,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.influencerService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('influencer', 'admin')
  async update(
    @Param('id') id: string,
    @Body() updateInfluencerDto: UpdateInfluencerDto,
  ) {
    return this.influencerService.update(id, updateInfluencerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.influencerService.remove(id);
  }

  @Post(':id/calculate-engagement')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('influencer', 'admin')
  async calculateEngagementRate(@Param('id') id: string) {
    return this.influencerService.calculateEngagementRate(id);
  }
}
```

### 4. Brand Module (Simplified)

**File**: `src/brand/brand.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandDto: CreateBrandDto, userId: string) {
    const existingBrand = await this.brandModel.findOne({ user: userId });
    
    if (existingBrand) {
      throw new BadRequestException('Brand profile already exists');
    }

    const brand = await this.brandModel.create({
      ...createBrandDto,
      user: userId,
    });

    return brand.populate('user', '-password');
  }

  async findAll() {
    return this.brandModel.find().populate('user', '-password');
  }

  async findOne(id: string) {
    const brand = await this.brandModel
      .findById(id)
      .populate('user', '-password')
      .populate('campaigns');

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      id,
      updateBrandDto,
      { new: true, runValidators: true },
    ).populate('user', '-password');

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return brand;
  }

  async remove(id: string) {
    const result = await this.brandModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return { message: 'Brand deleted successfully' };
  }
}
```

### 5. Campaign Module with Aggregation

**File**: `src/campaign/campaign.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument, CampaignStatus } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { FilterCampaignDto } from './dto/filter-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(createCampaignDto: CreateCampaignDto, brandId: string) {
    if (createCampaignDto.startDate > createCampaignDto.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const campaign = await this.campaignModel.create({
      ...createCampaignDto,
      brand: brandId,
    });

    // Update brand's campaign count
    await this.updateBrandCampaignCount(brandId, 1);

    return campaign.populate('brand');
  }

  async findAll(filterDto: FilterCampaignDto) {
    const query: any = {};

    if (filterDto.status) {
      query.status = filterDto.status;
    }

    if (filterDto.brandId) {
      query.brand = filterDto.brandId;
    }

    if (filterDto.minBudget) {
      query.budget = { $gte: parseInt(filterDto.minBudget) };
    }

    if (filterDto.maxBudget) {
      query.budget = { ...query.budget, $lte: parseInt(filterDto.maxBudget) };
    }

    const page = parseInt(filterDto.page) || 1;
    const limit = parseInt(filterDto.limit) || 10;
    const skip = (page - 1) * limit;

    const [campaigns, total] = await Promise.all([
      this.campaignModel
        .find(query)
        .populate('brand', 'companyName logo')
        .populate({
          path: 'collaborations',
          populate: { path: 'influencer', select: 'fullName profileImage' },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.campaignModel.countDocuments(query),
    ]);

    return {
      data: campaigns,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const campaign = await this.campaignModel
      .findById(id)
      .populate('brand')
      .populate({
        path: 'collaborations',
        populate: { path: 'influencer', select: 'fullName profileImage followers engagementRate' },
      });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    if (
      updateCampaignDto.startDate &&
      updateCampaignDto.endDate &&
      updateCampaignDto.startDate > updateCampaignDto.endDate
    ) {
      throw new BadRequestException('Start date must be before end date');
    }

    const campaign = await this.campaignModel.findByIdAndUpdate(
      id,
      updateCampaignDto,
      { new: true, runValidators: true },
    ).populate('brand');

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async updateStatus(id: string, status: CampaignStatus) {
    const campaign = await this.campaignModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).populate('brand');

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async getAnalytics(campaignId: string) {
    const analytics = await this.campaignModel.aggregate([
      { $match: { _id: new require('mongoose').Types.ObjectId(campaignId) } },
      {
        $lookup: {
          from: 'collaborations',
          localField: '_id',
          foreignField: 'campaign',
          as: 'collaborations',
        },
      },
      {
        $lookup: {
          from: 'influencers',
          localField: 'collaborations.influencer',
          foreignField: '_id',
          as: 'influencerDetails',
        },
      },
      {
        $project: {
          title: 1,
          budget: 1,
          status: 1,
          totalCollaborations: { $size: '$collaborations' },
          totalReach: {
            $sum: '$influencerDetails.followers.instagram',
          },
          avgEngagementRate: {
            $avg: '$influencerDetails.engagementRate',
          },
          collaborations: {
            $map: {
              input: '$collaborations',
              as: 'collab',
              in: {
                status: '$$collab.status',
                agreedAmount: '$$collab.agreedAmount',
              },
            },
          },
        },
      },
    ]);

    if (analytics.length === 0) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return analytics[0];
  }

  private async updateBrandCampaignCount(brandId: string, increment: number) {
    await this.campaignModel.db.collection('brands').updateOne(
      { _id: new require('mongoose').Types.ObjectId(brandId) },
      { $inc: { totalCampaigns: increment } },
    );
  }

  async remove(id: string) {
    const campaign = await this.campaignModel.findById(id);
    
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    // Update brand's campaign count
    await this.updateBrandCampaignCount(campaign.brand.toString(), -1);

    await this.campaignModel.findByIdAndDelete(id);

    return { message: 'Campaign deleted successfully' };
  }
}
```

### 6. Collaboration Module

**File**: `src/collaboration/collaboration.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collaboration, CollaborationDocument, CollaborationStatus } from './schemas/collaboration.schema';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectModel(Collaboration.name)
    private collaborationModel: Model<CollaborationDocument>,
  ) {}

  async create(createCollaborationDto: CreateCollaborationDto) {
    const collaboration = await this.collaborationModel.create({
      ...createCollaborationDto,
      paymentStatus: 'pending',
    });

    // Update campaign and influencer
    await Promise.all([
      this.updateCampaignCollaborationCount(createCollaborationDto.campaign.toString()),
      this.updateInfluencerCollaborationCount(createCollaborationDto.influencer.toString()),
    ]);

    return collaboration.populate([
      { path: 'influencer', select: 'fullName profileImage' },
      { path: 'campaign', select: 'title brand' },
    ]);
  }

  async findByInfluencer(influencerId: string, status?: CollaborationStatus) {
    const query: any = { influencer: influencerId };
    
    if (status) {
      query.status = status;
    }

    return this.collaborationModel
      .find(query)
      .populate('campaign', 'title brand')
      .sort({ createdAt: -1 });
  }

  async findByCampaign(campaignId: string, status?: CollaborationStatus) {
    const query: any = { campaign: campaignId };
    
    if (status) {
      query.status = status;
    }

    return this.collaborationModel
      .find(query)
      .populate('influencer', 'fullName profileImage followers')
      .sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: CollaborationStatus) {
    const collaboration = await this.collaborationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).populate(['influencer', 'campaign']);

    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID ${id} not found`);
    }

    return collaboration;
  }

  async completeDeliverable(collaborationId: string, deliverableIndex: number, url: string) {
    const collaboration = await this.collaborationModel.findById(collaborationId);
    
    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID ${collaborationId} not found`);
    }

    if (!collaboration.deliverables[deliverableIndex]) {
      throw new BadRequestException('Invalid deliverable index');
    }

    collaboration.deliverables[deliverableIndex].url = url;
    collaboration.deliverables[deliverableIndex].completedDate = new Date();
    
    await collaboration.save();

    return collaboration;
  }

  async addReview(collaborationId: string, rating: number, review: string) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const collaboration = await this.collaborationModel.findByIdAndUpdate(
      collaborationId,
      { rating, review },
      { new: true },
    ).populate('influencer');

    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID ${collaborationId} not found`);
    }

    // Update influencer's average rating
    await this.updateInfluencerRating(collaboration.influencer._id.toString());

    return collaboration;
  }

  async markAsPaid(collaborationId: string) {
    const collaboration = await this.collaborationModel.findByIdAndUpdate(
      collaborationId,
      { paymentStatus: 'paid', paymentDate: new Date() },
      { new: true },
    );

    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID ${collaborationId} not found`);
    }

    return collaboration;
  }

  private async updateCampaignCollaborationCount(campaignId: string) {
    await this.collaborationModel.db.collection('campaigns').updateOne(
      { _id: new require('mongoose').Types.ObjectId(campaignId) },
      { $inc: { totalReach: 1 } },
    );
  }

  private async updateInfluencerCollaborationCount(influencerId: string) {
    await this.collaborationModel.db.collection('influencers').updateOne(
      { _id: new require('mongoose').Types.ObjectId(influencerId) },
      { $inc: { totalCampaigns: 1 } },
    );
  }

  private async updateInfluencerRating(influencerId: string) {
    const result = await this.collaborationModel.aggregate([
      { $match: { influencer: new require('mongoose').Types.ObjectId(influencerId), rating: { $exists: true } } },
      { $group: { _id: '$influencer', avgRating: { $avg: '$rating' } } },
    ]);

    if (result.length > 0) {
      await this.collaborationModel.db.collection('influencers').updateOne(
        { _id: new require('mongoose').Types.ObjectId(influencerId) },
        { $set: { averageRating: result[0].avgRating } },
      );
    }
  }
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |

### Influencers

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/influencers` | Create influencer profile | Yes | influencer |
| GET | `/influencers` | Get all influencers (with filters) | No | - |
| GET | `/influencers/top` | Get top influencers | No | - |
| GET | `/influencers/:id` | Get influencer by ID | No | - |
| PUT | `/influencers/:id` | Update influencer | Yes | influencer, admin |
| DELETE | `/influencers/:id` | Delete influencer | Yes | admin |
| POST | `/influencers/:id/calculate-engagement` | Calculate engagement rate | Yes | influencer, admin |

### Brands

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/brands` | Create brand profile | Yes | brand |
| GET | `/brands` | Get all brands | No | - |
| GET | `/brands/:id` | Get brand by ID | No | - |
| PUT | `/brands/:id` | Update brand | Yes | brand, admin |
| DELETE | `/brands/:id` | Delete brand | Yes | admin |

### Campaigns

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/campaigns` | Create campaign | Yes | brand |
| GET | `/campaigns` | Get all campaigns (with filters) | No | - |
| GET | `/campaigns/:id` | Get campaign by ID | No | - |
| GET | `/campaigns/:id/analytics` | Get campaign analytics | Yes | brand, admin |
| PUT | `/campaigns/:id` | Update campaign | Yes | brand, admin |
| PATCH | `/campaigns/:id/status` | Update campaign status | Yes | brand, admin |
| DELETE | `/campaigns/:id` | Delete campaign | Yes | brand, admin |

### Collaborations

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/collaborations` | Create collaboration | Yes | brand |
| GET | `/collaborations/influencer/:id` | Get collaborations by influencer | Yes | influencer |
| GET | `/collaborations/campaign/:id` | Get collaborations by campaign | Yes | brand |
| PATCH | `/collaborations/:id/status` | Update collaboration status | Yes | brand, influencer |
| POST | `/collaborations/:id/deliverable` | Complete deliverable | Yes | influencer |
| POST | `/collaborations/:id/review` | Add review | Yes | brand |
| POST | `/collaborations/:id/pay` | Mark as paid | Yes | brand |

---

## Testing

### Setup Test Environment

Create `.env.test`:

```bash
MONGODB_URI=mongodb://localhost:27017/influencer_db_test
JWT_SECRET=test-secret-key
NODE_ENV=test
```

### Example Unit Test

**File**: `src/influencer/influencer.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InfluencerService } from './influencer.service';
import { Influencer } from './schemas/influencer.schema';
import { Model } from 'mongoose';

describe('InfluencerService', () => {
  let service: InfluencerService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfluencerService,
        {
          provide: getModelToken(Influencer.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InfluencerService>(InfluencerService);
    model = module.get<Model<any>>(getModelToken(Influencer.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated influencers', async () => {
      const mockInfluencers = [
        { _id: '1', fullName: 'John Doe', followers: { instagram: 10000 } },
        { _id: '2', fullName: 'Jane Smith', followers: { instagram: 20000 } },
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockInfluencers),
      } as any);

      jest.spyOn(model, 'countDocuments').mockResolvedValue(2);

      const result = await service.findAll({ page: '1', limit: '10' });

      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
      expect(result.meta.page).toBe(1);
    });
  });
});
```

### Run Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:cov

# Run specific test file
npm run test -- influencer.service.spec.ts
```

---

## Deployment

### Docker Setup

**File**: `Dockerfile`

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

**File**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: influencer_mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
      MONGO_INITDB_DATABASE: influencer_db
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  api:
    build: .
    container_name: influencer_api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/influencer_db?authSource=admin
      - PORT=3000
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "3000:3000"
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

### Deployment Steps

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Production Environment Variables

For production, ensure you set these environment variables:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer_db
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

---

## Additional Features to Implement

1. **File Upload**: Use `@nestjs/platform-express` with Multer for profile images
2. **Email Notifications**: Integrate with Nodemailer or SendGrid
3. **Real-time Updates**: Use Socket.IO for live collaboration updates
4. **Payment Integration**: Stripe or PayPal for handling payments
5. **Analytics Dashboard**: Advanced metrics and reporting
6. **Search Functionality**: Elasticsearch integration for advanced search
7. **Rate Limiting**: Use `@nestjs/throttler` for API protection
8. **API Documentation**: Swagger/OpenAPI documentation
9. **Logging**: Winston or Pino for structured logging
10. **Monitoring**: Prometheus and Grafana for metrics

---

## Conclusion

This guide provides a complete foundation for building an Influencer Management API with NestJS and MongoDB. The architecture follows best practices including:

- Modular structure for maintainability
- DTO validation for data integrity
- Role-based access control for security
- Pagination and filtering for performance
- Comprehensive error handling
- Environment configuration management
- Docker support for deployment

You can extend this base implementation with additional features based on your specific requirements.
