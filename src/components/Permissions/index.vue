<script>
import store from '@/store'
export default {
  functional: true,
  props: {
    permissions: {
      type: Array,
      required: true
    }
  },
  render (createElement, context) {
    const { props, scopedSlots } = context
    return store.getters['Permissions/permissions'].some(v =>
      props.permissions.includes(v)
    )
      ? scopedSlots.default()
      : null
  }
}
</script>
