<template>
  <div>
    <ul class="tabs">
      <li
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ 'is-active': tab.isActive }"
        class="tab-button"
        role="presentation"
      >
        <a
          :aria-controls="tab.name"
          :aria-selected="tab.isActive"
          href="#"
          @click="handleLangChange(tab.name, $event)"
          v-html="languages[tab.name]"
        />
      </li>
    </ul>
    <div class="panels">
      <slot/>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import Tab from './Tab';

const languages = {
  vanilla: `
    <svg viewBox="0 0 630 630" width="24">
      <rect width="630" height="630" fill="#f7df1e" />
      <path
        d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"
      />
    </svg>
    <span>Vanilla</span>
  `,
  vue: `
    <svg viewBox="0 0 261.76 226.69" width="24" >
      <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
        <g transform="translate(178.06 235.01)">
          <path
            d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z"
            fill="#41b883"
          />
        </g>
        <g transform="translate(178.06 235.01)">
          <path
            d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z"
            fill="#34495e"
          />
        </g>
      </g>
    </svg>
    <span>Vue</span>
  `,
  react: `
    <span>React</span>
  `,
  svelte: `
    <span>Svelte</span>
  `,
  angular: `
    <span>Angular</span>
  `,
};

export default {
  components: {
    Tab,
  },
  data() {
    return {
      tabs: this.$children,
    };
  },
  computed: {
    languages() {
      return languages;
    },
  },
  mounted() {
    const selectedLang = this.$selectedLang || this.tabs[0].name;

    this.tabs.forEach(tab => {
      tab.isActive = tab.name === selectedLang;
    });
  },
  watch: {
    $selectedLang(lang) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === lang;
      });
    },
  },
  methods: {
    handleLangChange(name, evt) {
      evt.preventDefault();

      this.$updateSelectedLang(name);
    },
  },
};
</script>

<style lang="scss" scoped>
.panels {
  border-top: 1px solid #ddd;
  padding: 10px 0 0;
}

.tabs {
  margin: 0;
  padding: 0;

  li {
    display: inline-block;

    a {
      border: 1px solid transparent;
      color: #bbb;
      display: inline-block;
      padding: 11px 25px 7px;
      margin: 0 0 -1px;
      text-align: center;

      &:hover {
        color: #888;

        :global(svg) {
          opacity: 0.7;
        }
      }

      :global(svg) {
        opacity: 0.5;
      }
      :global(span) {
        display: inline-block;
        vertical-align: super;
      }
    }

    &.is-active a {
      border: 1px solid #ddd;
      border-bottom: 1px solid #fff;
      border-top: 2px solid goldenrod;
      color: #555;

      :global(svg) {
        opacity: 1;
      }
    }
  }
}
</style>
