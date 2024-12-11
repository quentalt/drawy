<template>
  <div class="prose-container">
    <editor-content :editor="editor" class="prose max-w-none min-h-[200px] border rounded-md p-4" />
    <div class="flex gap-2 mt-2">
      <button
          v-for="(item, index) in items"
          :key="index"
          @click="item.action"
          :class="[
          'p-2 rounded',
          item.isActive() ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

const items = [
  {
    icon: BoldIcon,
    action: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold') ?? false
  },
  {
    icon: ItalicIcon,
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic') ?? false
  },
  {
    icon: ListBulletIcon,
    action: () => editor.value?.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value?.isActive('bulletList') ?? false
  },
]
</script>

<style>
.prose-container :deep(.ProseMirror) {
  outline: none;
}

.prose-container :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>