import { Heart } from 'lucide-react'
import type { Brand } from '../../data/brands'
import { useStore } from '../../state/store'
import { useToast } from './Toast'

/**
 * Change 46: heart a brand. Hearted brands' promotions come first in "Suggested for you" (home)
 * and in the Recommended sort (Promotions). Icon only by default; `labelled` adds text (brand page band).
 */
export function FavouriteButton({ brand, labelled, className = '' }: { brand: Pick<Brand, 'slug' | 'name'>; labelled?: boolean; className?: string }) {
  const { favouriteBrands, toggleFavourite } = useStore()
  const toast = useToast()
  const on = favouriteBrands.includes(brand.slug)
  const click = () => {
    toggleFavourite(brand.slug)
    toast(on ? `${brand.name} removed from your favourites` : `${brand.name} added to your favourites. Its promotions now show first.`)
  }
  return (
    <button
      type="button" aria-pressed={on} onClick={click}
      className={`${labelled ? 'btn btn--fav' : 'fav-btn'} ${className}`}
      aria-label={labelled ? undefined : `Favourite ${brand.name}`}
    >
      <Heart size={labelled ? 18 : 20} aria-hidden />
      {labelled && (on ? 'In your favourites' : 'Add to favourites')}
    </button>
  )
}
