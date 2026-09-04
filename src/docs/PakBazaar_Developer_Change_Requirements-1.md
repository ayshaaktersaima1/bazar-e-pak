# PakBazaar.com — Developer Change & Implementation Requirements

> **Purpose:** This document is the implementation/change checklist for the PakBazaar.com development team.  
> **Instruction:** Preserve correct existing work. Do not rebuild the project from scratch unless a specific module genuinely requires restructuring.

---

## 1. Project Direction

PakBazaar.com should be developed as a modern, professional **Pakistani marketplace + business discovery + digital promotion platform**.

The platform should:

- Help Pakistani businesses establish a professional digital presence.
- Give businesses their own digital shop/business space.
- Promote products and businesses through PakBazaar and social media.
- Support external businesses as well as PakBazaar's own/native brands.
- Use an original PakBazaar design and branding while taking general UX inspiration from large marketplaces.
- Remain modular, reusable, maintainable and scalable.

### Core Concept

**Seller → PakBazaar → Social Media Promotion → Customer → Sale**

The **Apni Dukan / Your Own Digital Shop** concept should remain an important part of the platform direction.

---

# 2. Homepage — Required Changes

## Hero Section

- Use a strong **Pakistan-focused visual/image first**.
- Do not make the discount the first visual on the homepage.
- Show the founder/owner picture and a concise **Vision & Mission** section early on.
- Clearly communicate the purpose of digitalizing Pakistani businesses.
- Communicate the **Apni Dukan / Your Own Digital Shop** concept.

## 14 August Launch Campaign

Add a highly visible **full-width announcement bar immediately below the main header/navbar**.

The campaign should clearly communicate:

**14 AUGUST SPECIAL LAUNCH OFFER**

Suggested supporting text:

> Take your business digital with PakBazaar and get a special launch discount.

CTA:

**Join PakBazaar Today / Register Now**

Also:

- Show a strong **70% OFF** badge/visual in the hero or primary promotional area.
- Clearly communicate the **50% offer** as well.
- Do not depend only on a small popup.
- Use professional Pakistan-themed green/red accents.
- Campaign content/images should be editable from the Developer Panel/CMS.

## Homepage Sections

The following should be manageable from the internal CMS/Developer Panel:

- Hero image
- Main headline
- Vision
- Mission
- Promotional banners
- Featured businesses
- Categories
- Trending products
- Top products
- Special offers
- Other promotional sections

---

# 3. Public Website / Search / Product Experience

Keep and polish the existing public pages:

- Home
- All Products
- Shops
- Category-wise Products
- About Us
- Cart
- Product Details
- Store Details
- Register
- Login

## Search

Search should support:

- Businesses/Shops
- Products
- Brands
- Services

Add useful:

- Search suggestions
- Autocomplete
- Product suggestions
- Navbar search

## Filters

Support useful filters such as:

- Category
- City / Location
- Business type
- Products / Services
- Rating
- Featured
- Popular
- New

## Product

Products should support:

- Product image(s)
- Product name
- Description
- Price
- Discount
- Dynamically calculated discount percentage
- Product details
- Quantity
- Add to Cart
- Product search/filter
- Views

---

# 4. Business / Shop Profile

Every business/shop should have a professional standalone page.

Example:

**Mobile Shops → ABC Mobile Store**

The page should support:

- Business name
- Business logo
- Cover/banner
- Multiple images/gallery
- Business description
- Products
- Services
- Contact number
- WhatsApp
- Website
- YouTube
- Facebook
- Instagram
- Other social links
- Address
- Google Maps/location
- Opening hours
- Ratings
- Reviews
- Comments
- Share option

Prominent action buttons should include:

- WhatsApp
- Call
- Website
- Location
- YouTube
- Social Media

---

# 5. Seller / Business Registration Flow

The required flow is:

**Seller Registration → Developer Panel Approval → Seller Account/Shop Activated → Seller Dashboard**

Important:

- A newly registered seller/shop must **NOT become publicly active before Developer approval**.
- Developer must be able to:
  - Approve
  - Reject
  - Suspend
  - Deactivate
  - Delete (where appropriate)
- Seller should only access/manage their own business and products.
- Seller must never see another seller's private data.
- Seller Dashboard should become active only after approval.

---

# 6. Seller Dashboard

Every approved business should receive its own professional dashboard.

## Business Management

Seller should be able to manage:

- Business profile
- Logo
- Cover image
- Gallery
- Description
- Products
- Prices
- Discounts
- Offers
- Contact information
- WhatsApp
- Website
- YouTube
- Social media
- Address/location
- Opening hours

## Seller Analytics

Show at minimum:

- Profile Views
- Product Views
- WhatsApp Clicks
- Call Clicks
- Website Clicks
- Location Clicks
- YouTube/Social Clicks
- Shares
- Reviews
- Other meaningful interactions

Also show:

- Most viewed products
- Best-performing products
- High-demand products
- Active offers
- Product sales
- Total orders/sales where transactions are available

Analytics should support daily/weekly/monthly/custom date ranges where practical.

Seller analytics must be isolated by business.

---

# 9. ADMIN + DEVELOPER PRODUCT & SALES ANALYTICS — IMPORTANT

Both the **Developer/Super Admin Panel and Main Admin Panel** should have a clear analytics/reporting area.

The purpose is to understand exactly how products, shops and sellers are performing across PakBazaar.

## Product-Level Analytics

For **every product**, Admin and Developer should be able to see:

- Product name
- Product/shop/business
- Product views
- WhatsApp clicks
- Call clicks
- Website clicks
- Location clicks
- YouTube/social clicks
- Share clicks
- Add-to-cart count where available
- Purchase/order count
- Units sold
- Total sales/revenue where transaction data is available
- Reviews/ratings
- Conversion information where sufficient data exists

The system should make it possible to identify **which product receives the most attention and which product generates the most sales**.

## Shop / Business-Level Analytics

For each shop/business, Admin and Developer should be able to see:

- Total products
- Total product views
- Total shop/profile views
- WhatsApp clicks
- Call clicks
- Website clicks
- Location clicks
- Social/YouTube clicks
- Shares
- Reviews
- Total orders
- Total products sold
- Total sales/revenue where transaction data is available

This should allow comparison between different shops.

## Seller / Platform Overview

Admin and Developer should be able to see platform-level totals such as:

- Total registered sellers
- Total approved sellers
- Total pending sellers
- Total active sellers
- Total shops/businesses
- Total products
- Total active products
- Total orders
- Total products sold
- Total sales/revenue where transaction data is available
- Total customer/user accounts
- Total reviews
- Total product views
- Total WhatsApp clicks
- Total calls
- Total website clicks
- Total location clicks
- Total shares

## External Sellers vs PakBazaar Own/Native Products

Analytics must clearly distinguish between:

**External Seller Products / Shops**

and

**PakBazaar Own / Native Products / Shops**

Admin and Developer should be able to compare:

- Number of products
- Number of shops
- Product views
- Customer interactions
- Orders
- Units sold
- Sales/revenue where available

This is important so management can understand **how much business is coming from external sellers versus PakBazaar's own/native products**.

## Shop-Wise Sales Reporting

Provide reporting such as:

| Shop / Business | Products | Views | Orders | Units Sold | Sales |
|---|---:|---:|---:|---:|---:|
| Shop A | 25 | 5,000 | 120 | 180 | — |
| Shop B | 12 | 2,800 | 65 | 90 | — |
| PakBazaar Native | 30 | 7,500 | 210 | 300 | — |

> Sales/revenue fields should be populated when actual transaction/order/payment data is available. Do not invent sales numbers from clicks.

## Product-Wise Reporting

Admin and Developer should be able to drill down:

**Shop → Products → Product → Customer Interactions → Orders/Sales**

Example:

```text
ABC Mobile Store
 ├── Product A
 │    ├── Views: 2,500
 │    ├── WhatsApp Clicks: 180
 │    ├── Calls: 45
 │    ├── Add to Cart: 90
 │    └── Units Sold: 35
 │
 ├── Product B
 │    ├── Views: 1,200
 │    ├── WhatsApp Clicks: 70
 │    └── Units Sold: 18
 │
 └── Total Shop Sales: 53 units
```

## Admin Permission

Main Admin should be able to **view these analytics and reports**, subject to Developer-configured permissions.

Developer/Super Admin should have **complete access** to all platform analytics and reporting.

Seller users should only see analytics for their own business.

---

# 9. Event-Based Analytics — IMPORTANT

Do **not** implement analytics as simple counters only.

Record meaningful user events so accurate reporting can be generated later.

## Track Events Such As

- Business/profile view
- Product view
- WhatsApp click
- Phone/call click
- Website click
- Location/map click
- YouTube click
- Social media click
- Share
- Search activity
- Review submission
- Purchase/order events if transactions are enabled

Each event should be attributable where relevant to:

- Business/shop
- Product
- Event type
- Date/time
- Source/page

## Developer Analytics

Developer Panel should provide complete platform analytics.

## Seller Analytics

Business owners should only see analytics belonging to their own business.

### Example

```text
Profile Views       5,000
WhatsApp Clicks       420
Calls                 180
Website Clicks         95
Location Clicks       230
Product Views       1,200
Reviews                35
```

The purpose is to demonstrate how much customer visibility and interaction PakBazaar generates for each business.

---

# 10. Developer Panel — Super Admin

Create a private **Developer / Super Admin Panel**.

Example route:

```text
/yasir-tech-panel
```

> **Security Warning:** Security must NEVER depend on hiding the URL.

Use:

- Strong authentication
- Server-side authorization
- Secure sessions/tokens
- Rate limiting
- Input validation
- Secure file uploads
- Ideally 2FA for Developer accounts

## Developer Authority

Developer has maximum platform authority.

Developer should control:

### Sellers

- Seller approvals
- Rejections
- Activation
- Deactivation
- Suspension
- Deletion

### Platform Data

- All shops/businesses
- All products
- Categories
- Users
- Reviews
- Comments

### Homepage / CMS

- Hero
- Vision
- Mission
- Banners
- Promotions
- Featured businesses
- Categories
- Trending products
- Top products
- Other homepage sections

### Product Promotion

Developer should be able to manually promote products into:

- Trending Products
- Featured Products
- Best Sellers
- Most Viewed
- Most Reviewed
- Most Shared
- Recommended
- Special Offers

An automated qualification system can be added later using analytics.

### Own / Native Brands — Full Management

PakBazaar's own/native products must have **full CRUD and management authority** in the Developer/Super Admin Panel.

The Developer/Super Admin must be able to do everything that is available for external seller products, including:

- Create products
- View products
- Edit/update products
- Delete products
- Change product prices
- Change discounts
- Change discount percentages
- Manage stock/availability
- Upload/change/delete product images
- Update product descriptions/details
- Create/update/remove offers
- Feature/promote products
- Add/remove products from Trending
- Manage product visibility/activation
- View product-level analytics
- View product sales/orders where transaction data is available

**Important:** PakBazaar's own/native products must not be treated as read-only or as a separate restricted category. The Developer/Super Admin should have complete control over them just like other products, with the additional ability to manage and promote PakBazaar's own products.

### Platform Management

Developer should control:

- Admin accounts
- Admin permissions
- Platform settings
- Complete analytics
- Audit logs

---

# 11. Main Admin Panel — Limited Authority

Admin Panel must remain **below the Developer Panel** in authority.

Admin can perform day-to-day management according to assigned permissions.

Admin may manage:

- Approved shops
- Products
- Reviews
- Comments
- Business analytics where permitted

Admin must NOT automatically be allowed to:

- Approve new sellers
- Change Developer credentials
- Change critical system settings
- Perform unrestricted platform-wide destructive actions

Developer should be able to configure Admin permissions.

---

# 12. Homepage CMS + Internal Content Management

Authorized internal users should be able to update website content **without code changes**.

CMS should support:

- Hero/banner images
- Headings
- Vision
- Mission
- Promotions
- Featured businesses
- Categories
- Trending products
- Other homepage sections

## Reusable Templates

Do not manually hard-code a separate page for every business.

Suggested workflow:

**Create Business → Select Template → Upload Images → Enter Content → Add Details → Save → Publish**

At minimum, prepare:

### Template 1 — Business Profile

For shops/businesses.

### Template 2 — Brand/Product Profile

For brands and product-focused profiles.

The architecture should allow more templates to be added later.

Internal management should allow authorized users to:

- Upload multiple images
- Add business content
- Add contact information
- Add WhatsApp
- Add location
- Add social links
- Add products
- Publish
- Update existing pages

---

# 13. Reviews / Comments / Moderation

Customers should be able to submit:

- Rating
- Text review
- Photos

Reviews must be associated with the correct:

- Shop/business
- Product

Developer/Admin moderation should support:

- Approve
- Reject
- Hide
- Remove
- Basic abuse/spam handling

Public pages should show useful rating and review information.

---

# 14. English + Urdu / RTL

English is the default language.

Add a clear:

**English | اردو**

language switcher.

Urdu must support proper **RTL (Right-to-Left)** layout across:

- Homepage
- Navigation
- Forms
- Product pages
- Business pages
- Dashboards
- Admin panels

Internal management should allow English and Urdu content to be managed separately where required.

Do not hard-code text in a way that prevents future localization.

---

# 15. Our Team Management

Add an **Our Team** section/page.

Developer Panel should allow:

- Add team member
- Edit team member
- Delete team member
- Upload picture
- Name
- Designation
- Bio
- Social links
- Display order
- Active/inactive status

---

# 16. Security / Data / Audit

Security must be implemented on the backend, not only in the frontend.

Required:

- Role-Based Access Control (RBAC)
- Backend authorization
- Input validation/sanitization
- Secure image/file uploads
- Protected authentication
- Secure sessions/tokens
- Protected APIs
- Rate limiting for sensitive endpoints
- Proper access control

## Audit Log

Maintain an audit log for important actions.

Record:

- Who performed the action
- What action was performed
- What entity was affected
- What changed
- Date/time
- Relevant metadata where appropriate

Examples:

```text
Admin deleted product
Developer approved seller
Developer changed Admin permissions
Developer changed platform settings
```

---

# 17. Database / Architecture

Primary database direction:

**MongoDB**

This aligns with the current MERN-oriented implementation.

Keep the system modular and data-driven.

Suggested logical modules/entities:

- Users
- Roles
- Businesses/Shops
- Products
- Categories
- Reviews
- Analytics Events
- Banners/CMS
- Promotions
- Team
- Cart
- Orders (where applicable)

Use a scalable business/tenant-aware structure so each seller's data remains isolated.

Do not create duplicated code for every business.

---

# 18. SEO / Performance / Responsive Design

Keep and improve SEO.

Business and product pages should support:

- Dynamic page titles
- Dynamic descriptions
- Clean URLs/slugs
- Category SEO
- Business SEO
- Product SEO
- Open Graph/social sharing metadata
- Favicon
- Basic structured SEO support where appropriate

Performance:

- Optimize images
- Optimize API calls
- Pagination
- Lazy loading where appropriate
- Caching/optimization where appropriate

The website must be responsive on:

- Mobile
- Tablet
- Desktop

---

# 19. 14 August Launch Final Checklist

Before launch verify:

- [ ] Full-width announcement bar below navbar
- [ ] 70% offer clearly visible
- [ ] 50% offer clearly communicated
- [ ] Pakistan-focused hero visual first
- [ ] Founder/owner picture visible
- [ ] Vision/Mission visible early
- [ ] Clear business registration CTA
- [ ] Campaign content editable from Developer Panel/CMS
- [ ] Mobile responsiveness tested

---

# 20. Acceptance / QA Checklist

## Public Website

- [ ] All public routes work
- [ ] Navigation works
- [ ] Register works
- [ ] Login works
- [ ] Logout works
- [ ] Product pages work
- [ ] Shop pages work
- [ ] Search works
- [ ] Filters work
- [ ] Cart works
- [ ] Quantity updates work
- [ ] Dynamic discounts work

## Seller

- [ ] Seller registration works
- [ ] New seller remains pending
- [ ] Developer approval required
- [ ] Approved seller becomes active
- [ ] Seller Dashboard works
- [ ] Seller can only access own data
- [ ] Seller analytics work

## Developer/Admin

- [ ] Developer Panel protected
- [ ] Developer has maximum permissions
- [ ] Admin has limited permissions
- [ ] Seller approval works
- [ ] Product/shop management works
- [ ] CMS works
- [ ] Own-brand management works
- [ ] Trending/featured controls work
- [ ] Audit logs work

## Analytics

- [ ] Profile views tracked
- [ ] Product views tracked
- [ ] WhatsApp clicks tracked
- [ ] Call clicks tracked
- [ ] Website clicks tracked
- [ ] Location clicks tracked
- [ ] Social/YouTube clicks tracked
- [ ] Shares tracked
- [ ] Searches tracked
- [ ] Reviews tracked
- [ ] Reporting is business/product/date aware
- [ ] Admin can view product-level analytics
- [ ] Developer can view product-level analytics
- [ ] Admin can view shop-wise sales/performance
- [ ] Developer can view shop-wise sales/performance
- [ ] External seller vs PakBazaar native reporting works
- [ ] Total sellers/products/orders/sales overview works
- [ ] Product-to-shop drill-down works

## Localization

- [ ] English works
- [ ] Urdu works
- [ ] RTL works
- [ ] Mobile RTL works

## Security

- [ ] Protected APIs tested
- [ ] RBAC tested
- [ ] Seller data isolation tested
- [ ] File uploads secured
- [ ] Authentication tested
- [ ] Sensitive endpoints protected
- [ ] Audit logging tested

---

# 21. Implementation Priority

## P0 — Critical

1. Seller approval flow
2. Developer/Admin role hierarchy
3. Backend security & authorization
4. Event-based analytics
5. Admin + Developer product/shop/seller analytics
6. Seller Dashboard
7. Developer Panel core controls, including full native-product CRUD
8. Homepage/14 August launch changes

## P1 — High

1. CMS
2. Shop/business management
3. Product/discount controls
4. Reviews/moderation
5. Search/filters
6. English + Urdu/RTL
7. Reusable templates

## P2 — Important

1. Advanced analytics
2. Automated trending/recommendation qualification
3. Team management
4. Deeper SEO/performance optimization
5. Future-ready order/transaction reporting

---

# 22. Final Developer Instruction

**Please use this document as the official change/implementation checklist for the current PakBazaar.com project.**

The goal is **not simply to make the current pages look better**. The project should become a scalable, secure and maintainable platform where:

**Businesses can join → Developer approves them → They receive their own digital shop → They manage products/content → Customers discover businesses/products → PakBazaar tracks visibility and interactions → Businesses can see the value generated by PakBazaar.**

All new modules should be implemented in a **reusable, modular and scalable** manner so that future businesses, categories, brands and features can be added without rewriting the application.

---

## Reference

The supplied company profile describes Bazaar e Pak / Apni Dukan as a digital marketplace and social-commerce concept focused on Pakistani businesses, quality products, local business promotion and the “Apni Dukan” model. It also defines the platform's vision, mission, categories and digital promotion network. The implementation should preserve this business direction while using the current product name **PakBazaar.com**.
