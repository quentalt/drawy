<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
      <input
          type="date"
          :value="modelValue.start"
          @input="updateDate('start', ($event.target as HTMLInputElement).value)"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
      />
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
      <input
          type="date"
          :value="modelValue.end"
          @input="updateDate('end', ($event.target as HTMLInputElement).value)"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface DateRange {
  start: string
  end: string
}

const props = defineProps<{
  modelValue: DateRange
}>()

const emit = defineEmits<{
  'update:modelValue': [value: DateRange]
}>()

const updateDate = (type: 'start' | 'end', value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [type]: value
  })
}
</script>