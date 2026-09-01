# Table System Guidelines

## Folder Structure

```text
src/
└── components/
    ├── table/
    │   ├── data-table.jsx
    │   ├── pagination.jsx
    │   ├── table-search.jsx
    │   ├── table-filter.jsx
    │   ├── user-management-columns.jsx
    │   ├── product-management-columns.jsx
    │   ├── shop-management-columns.jsx
    │   ├── category-management-columns.jsx
    │   └── order-management-columns.jsx
    │
    └── shared/
        ├── search-input.jsx
        ├── select.jsx
        ├── empty-state.jsx
        └── loading.jsx
```

---

## `components/table/data-table.jsx`

**Main reusable table component.**

Use for:

* Users
* Products
* Shops
* Categories
* Orders
* Any future table

```jsx
import DataTable from "@/components/table/data-table";
```

### Basic

```jsx
<DataTable
    columns={columns}
    data={data}
    meta={meta}
/>
```

### With Search

```jsx
<DataTable
    columns={columns}
    data={data}
    meta={meta}
    search
    searchValue={search}
    onSearch={handleSearch}
/>
```

### With Filters

```jsx
<DataTable
    columns={columns}
    data={data}
    meta={meta}
    filters={filters}
    filterValues={filterValues}
    onFilter={handleFilter}
/>
```

### Full

```jsx
<DataTable
    columns={columns}
    data={data}
    meta={meta}
    search
    searchValue={search}
    onSearch={handleSearch}
    searchPlaceholder="Search users..."
    filters={filters}
    filterValues={filterValues}
    onFilter={handleFilter}
    page={page}
    limit={limit}
    onPageChange={handlePageChange}
    onLimitChange={handleLimitChange}
    loading={loading}
/>
```

---

## `components/table/pagination.jsx`

**Reusable table pagination.**

Normally `DataTable` নিজেই এটি ব্যবহার করবে।

Directly use only when a page needs custom pagination.

```jsx
import Pagination from "@/components/table/pagination";
```

```jsx
<Pagination
    page={page}
    limit={limit}
    total={meta.total}
    totalPages={meta.totalPages}
    onPageChange={handlePageChange}
    onLimitChange={handleLimitChange}
/>
```

**Backend controls:**

```text
page
limit
total
totalPages
```

No static/dummy pagination.

---

## `components/table/table-search.jsx`

**Table-specific search UI.**

Normally `DataTable` ব্যবহার করবে।

Direct use only when custom table search UI is needed.

```jsx
import TableSearch from "@/components/table/table-search";
```

```jsx
<TableSearch
    value={search}
    onChange={setSearch}
    placeholder="Search users..."
/>
```

---

## `components/table/table-filter.jsx`

**Multiple table filters-এর reusable UI।**

```jsx
import TableFilter from "@/components/table/table-filter";
```

### Filter config

```jsx
const filters = [
    {
        key: "role",
        label: "All Roles",
        options: [
            {
                label: "Admin",
                value: "admin",
            },
            {
                label: "Seller",
                value: "seller",
            },
        ],
    },
];
```

### Use

```jsx
<TableFilter
    filters={filters}
    values={filterValues}
    onChange={handleFilter}
/>
```

---

# Column Files

## `user-management-columns.jsx`

**Only user table-এর columns, badges, actions থাকবে।**

```jsx
import {
    userColumns,
    userFilters,
} from "@/components/table/user-management-columns";
```

```jsx
const columns = userColumns({
    onStatusChange,
    loadingId,
});
```

Then:

```jsx
<DataTable
    columns={columns}
    data={users}
    meta={meta}
    filters={userFilters}
/>
```

---

## Other Column Files

Same pattern:

```text
product-management-columns.jsx
→ Product table columns/actions/filters

shop-management-columns.jsx
→ Shop table columns/actions/filters

category-management-columns.jsx
→ Category table columns/actions/filters

order-management-columns.jsx
→ Order table columns/actions/filters
```

Example:

```jsx
import {
    productColumns,
    productFilters,
} from "@/components/table/product-management-columns";
```

---

# `components/shared/`

These are **not table-specific**.

## `search-input.jsx`

Any page/component-এর search input.

```jsx
import SearchInput from "@/components/shared/search-input";
```

```jsx
<SearchInput
    value={search}
    onChange={setSearch}
    placeholder="Search..."
/>
```

---

## `select.jsx`

Any generic select/dropdown.

```jsx
import Select from "@/components/shared/select";
```

```jsx
<Select
    value={role}
    onChange={setRole}
    placeholder="Select role"
    options={[
        {
            label: "Admin",
            value: "admin",
        },
        {
            label: "Seller",
            value: "seller",
        },
    ]}
/>
```

---

## `empty-state.jsx`

Any empty content state.

```jsx
import EmptyState from "@/components/shared/empty-state";
```

```jsx
<EmptyState message="No products found." />
```

---

## `loading.jsx`

Any loading state.

```jsx
import Loading from "@/components/shared/loading";
```

```jsx
<Loading />
```

---

# Backend Data Flow

```text
URL Query
   ↓
page / limit / search / filters
   ↓
API
   ↓
Backend
   ↓
data + meta
   ↓
DataTable
```

Example backend response:

```js
{
    success: true,
    data: [...],
    meta: {
        page: 1,
        limit: 10,
        total: 120,
        totalPages: 12
    }
}
```

---

# Important Rules

```text
data-table.jsx
→ Generic only
→ Never add user/product/shop-specific logic

*-columns.jsx
→ Module-specific columns
→ Badges
→ Actions
→ Buttons
→ Custom renderers

pagination.jsx
→ Pagination UI only

table-search.jsx
→ Table search UI only

table-filter.jsx
→ Table filter UI only

shared/*
→ Table-এর বাইরেও reusable components
```

### Final rule

**New table = new `*-columns.jsx`**

**Existing table change = only its `*-columns.jsx`**

**Common table behavior change = `data-table.jsx`**

**Never duplicate table implementation.**
