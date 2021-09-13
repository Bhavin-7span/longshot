<template>
  <div class="editor editor--horizontal" v-if="editor">
    <div class="editor__box">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <div class="editor__sidebar">
      <h3 class="sidebar-title">Performance:</h3>
      <ul class="performance">
        <li>
          <label>Words Count: </label>
          <p class="counter">{{ wordsCount }}</p>
        </li>
        <li>
          <label>Redability: </label>
          <p class="redebility-message">{{ scoreMessage }}</p>
        </li>
      </ul>
      <div class="keywords-box">
        <h3 class="sidebar-title">Keywords to Use:</h3>
        <!-- {{ keywordsList }} -->
        <ul class="keyword-list">
          <li v-for="(keys, index) in keywordsList" :key="'keyword-' + index">
            <span :class="keys.isActive ? 'is-active' : ''">{{
              keys.name
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import History from "@tiptap/extension-history";
import CharacterCount from "@tiptap/extension-character-count";
import { syllable } from "syllable";
import { wordsCount } from "words-count";
import { flesch } from "flesch";

export default {
  components: {
    EditorContent,
    MenuBar: require("@/components/MenuBar").default
  },

  data() {
    return {
      provider: null,
      editor: null,
      wordsCount: 0,
      syllableCount: 0,
      sentencesCount: 0,
      scoreMessage: "Very easy to read",
      keywordsList: [
        {
          name: "frank carney",
          isActive: false
        },
        { name: "american multinational", isActive: false },
        { name: "multinational restaurant", isActive: false },
        { name: "international fanchise", isActive: false },
        { name: "franchise founded", isActive: false },
        { name: "including pasta", isActive: false },
        { name: "side dishes", isActive: false },
        { name: "pizza carryout", isActive: false },
        { name: "app store", isActive: false },
        { name: "food delivery", isActive: false },
        { name: "largest pizza", isActive: false },
        { name: "official pizza", isActive: false },
        { name: "favorite pizza", isActive: false },
        { name: "play store", isActive: false }
      ]
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Highlight,
        Underline,
        History,
        CharacterCount.configure({
          limit: 10000
        })
      ],
      onUpdate: ({ editor }) => {
        var content = editor.state.doc.textContent.trim();

        this.checkKeywords(content);
        // content = content.replace(/(^\s)|(\s$)/gi, "");
        // content = content.replace(/[ ]{2,}/gi, " ");
        // content = content.replace(/\n /, "\n");
        // this.wordsCount = content.split(" ").length;
        this.wordsCount = wordsCount(content, {
          punctuation: ["-", "'"]
        });

        var sentences = content.split(/[\\.!?]/);
        this.sentencesCount = sentences.length;
        this.syllableCount = syllable(content);
        let score = flesch({
          sentence: this.sentencesCount,
          word: this.wordsCount,
          syllable: this.syllableCount
        });
        // let score = this.calculateFlesch(
        //   this.sentencesCount,
        //   this.wordsCount,
        //   this.syllableCount
        // );
        console.log("sc", score);
        this.getScore(score);
      }
    });
  },

  methods: {
    // calculateFlesch(totalSentences, totalWords, totalSyllables) {
    //   console.log("ts", totalSentences);
    //   console.log("tw", totalWords);
    //   console.log("tsl", totalSyllables);
    //   return (
    //     206.835 -
    //     1.015 * (totalWords / totalSentences) -
    //     84.6 * (totalSyllables / totalWords)
    //   );
    // },
    getScore(score) {
      switch (
        true // <=== Change is here
      ) {
        case score > 100:
          this.scoreMessage = "Very easy to read";
          break;
        case score > 80:
          this.scoreMessage = "Easy to read.";
          break;
        case score > 60:
          this.scoreMessage = "Fairly easy to read.";
          break;
        case score > 40:
          this.scoreMessage = "Difficult to read.";
          break;
        case score > 20:
          this.scoreMessage = "Very difficult to read.";
          break;
        case score > 10:
          this.scoreMessage = "Extremely difficult to read.";
          break;
        default:
          this.scoreMessage = "Very easy to read";
      }
    },
    checkKeywords(content) {
      // this.keywordsList.sort(function(a, b) {
      //   var lenA = a.length;
      //   var lenB = b.length;
      //   if (lenA === lenB) {
      //     return 0;
      //   }
      //   return lenA > lenB ? -1 : 1;
      // });

      this.keywordsList.forEach(function(word) {
        var regex = new RegExp(word.name, "i");
        var match = content.match(regex);
        if (match) {
          word.isActive = true;
          content = content.replace(regex, "");
        } else {
          word.isActive = false;
        }
      });
    }
  },

  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  }
};
</script>
