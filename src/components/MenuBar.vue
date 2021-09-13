<template>
  <div>
    <template v-for="(item, index) in items">
      <div
        class="divider"
        v-if="item.type === 'divider'"
        :key="`divider${index}`"
      />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    MenuItem: require("@/components/MenuItem").default
  },

  props: {
    editor: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      items: [
        {
          icon: "bold",
          title: "Bold",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleBold()
              .run(),
          isActive: () => this.editor.isActive("bold")
        },
        {
          icon: "italic",
          title: "Italic",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleItalic()
              .run(),
          isActive: () => this.editor.isActive("italic")
        },
        {
          icon: "underline",
          title: "Underline",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleUnderline()
              .run(),
          isActive: () => this.editor.isActive("underline")
        },
        {
          icon: "h-1",
          title: "Heading 1",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run(),
          isActive: () => this.editor.isActive("heading", { level: 1 })
        },
        {
          icon: "h-2",
          title: "Heading 2",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run(),
          isActive: () => this.editor.isActive("heading", { level: 2 })
        },
        {
          icon: "h-3",
          title: "Heading 3",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run(),
          isActive: () => this.editor.isActive("heading", { level: 3 })
        },
        {
          icon: "list-unordered",
          title: "Bullet List",
          action: () =>
            this.editor
              .chain()
              .focus()
              .toggleBulletList()
              .run(),
          isActive: () => this.editor.isActive("bulletList")
        },
        {
          icon: "arrow-go-back-line",
          title: "Undo",
          action: () =>
            this.editor
              .chain()
              .focus()
              .undo()
              .run()
        },
        {
          icon: "arrow-go-forward-line",
          title: "Redo",
          action: () =>
            this.editor
              .chain()
              .focus()
              .redo()
              .run()
        }
      ]
    };
  }
};
</script>

<style>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>