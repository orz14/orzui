# ORZUI

Library UI React yang customizable dengan TailwindCSS v3. Komponen akan ditambahkan langsung ke project Anda, sehingga Anda memiliki kontrol penuh untuk memodifikasinya.

## Instalasi

```bash
npx @orz14/orzui@latest init
# atau
npm install -g @orz14/orzui
```

## Quick Start

### 1. Inisialisasi

```bash
npx orzui init
```

Perintah ini akan:

- Membuat file konfigurasi `orzui.json`
- Membuat folder untuk komponen (default: `src/components/orzui`)
- Membuat folder untuk utilities (default: `src/lib`)
- Menambahkan utility function `cn` untuk merge classnames
- Update `package.json` dengan dependencies yang diperlukan

### 2. Install Dependencies

```bash
npm install
```

### 3. Tambahkan Komponen

```bash
# Tambah satu komponen
npx orzui add button

# Tambah beberapa komponen
npx orzui add button card input

# Tambah semua komponen
npx orzui add --all

# Pilih dari list interaktif
npx orzui add
```

### 4. Gunakan Komponen

```tsx
import { Button } from "@/components/orzui/button";
import { Card } from "@/components/orzui/card";

function App() {
  return (
    <Card padding="lg" shadow="xl">
      <h1>Hello World</h1>
      <Button variant="primary" size="md">
        Click Me
      </Button>
    </Card>
  );
}
```

## Komponen yang Tersedia

- `button` - Button component dengan berbagai variant
- `card` - Card container component
- `input` - Input field dengan label dan error
- `badge` - Badge untuk status atau tag
- `alert` - Alert untuk notifications
- `avatar` - Avatar dengan fallback

## Konfigurasi

File `orzui.json` di root project Anda:

```json
{
  "style": "default",
  "typescript": true,
  "componentsPath": "src/components/orzui",
  "utilsPath": "src/lib"
}
```

## Customization

Karena komponen ditambahkan langsung ke project Anda, Anda memiliki kontrol penuh untuk:

### 1. Edit Langsung

Buka file komponen dan edit sesuai kebutuhan:

```tsx
// src/components/orzui/button.tsx
export const Button = ({ ... }) => {
  // Edit styles, logic, atau apapun yang Anda mau
  return (
    <button className="your-custom-classes">
      {children}
    </button>
  );
};
```

### 2. Tambahkan Variant Baru

```tsx
const variants = {
  primary: "...",
  secondary: "...",
  // Tambahkan variant baru
  gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
};
```

### 3. Ganti Warna/Style

```tsx
const variants = {
  // Ganti dari blue ke purple
  primary: "bg-purple-600 text-white hover:bg-purple-700",
};
```

### 4. Tambahkan Props Baru

```tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  // Tambahkan props baru
  rounded?: "sm" | "md" | "lg" | "full";
  shadow?: boolean;
}
```

## Keuntungan Pendekatan Ini

✅ **Full Control** - Komponen ada di codebase Anda, edit sesuka hati

✅ **No Black Box** - Anda bisa lihat dan pahami setiap baris code

✅ **Tree Shaking** - Hanya komponen yang Anda gunakan yang akan di-bundle

✅ **TypeScript Support** - Full type safety

✅ **Customizable** - Sesuaikan dengan design system Anda

✅ **No Breaking Changes** - Update library tidak akan break komponen Anda

## Path Aliases

Tambahkan path alias di `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Dan di `vite.config.ts` (untuk Vite):

```ts
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## Commands

### init

Inisialisasi ORZUI di project Anda:

```bash
npx orzui init
```

### add

Tambahkan komponen:

```bash
# Interactive mode
npx orzui add

# Add specific components
npx orzui add button card

# Add all components
npx orzui add --all

# Overwrite existing
npx orzui add button --overwrite
```

## Examples

### Button

```tsx
<Button variant="primary" size="md">
  Primary Button
</Button>

<Button variant="outline" size="lg" fullWidth>
  Outline Button
</Button>

<Button variant="danger" isLoading>
  Loading...
</Button>
```

### Card

```tsx
<Card padding="lg" shadow="xl" bordered>
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>

<Card hoverable onClick={() => console.log('clicked')}>
  Clickable Card
</Card>
```

### Input

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Email is required"
  fullWidth
/>

<Input
  label="Search"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
/>
```

## FAQ

**Q: Bagaimana cara update komponen?**

A: Jalankan `npx orzui add [component] --overwrite`. Atau edit manual file komponen di project Anda.

**Q: Apakah bisa digunakan tanpa TypeScript?**

A: Ya! Saat `init`, pilih JavaScript dan komponen akan di-generate dalam `.jsx`.

**Q: Bagaimana cara menambahkan komponen custom?**

A: Karena komponen ada di codebase Anda, tinggal buat file baru di folder yang sama dan ikuti pattern yang ada.

**Q: Apakah perlu install dependencies lain?**

A: Ya, `clsx` dan `tailwind-merge`. Sudah otomatis ditambahkan ke `package.json` saat `init`.

## License

MIT © orz14
