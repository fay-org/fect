import { defineComponent } from 'vue'
import { useProvider } from '../utils'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'
import PaginationItem from './pagination-item'

const PaginationNext = defineComponent({
  setup(props, { slots }) {
    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)

    return () => (
      <PaginationItem
        disabled={context!.isLast.value}
        onClick={() => context!.sideUpdatePage('next')}
      >
        {slots.default?.()}
      </PaginationItem>
    )
  },
})

export default PaginationNext
