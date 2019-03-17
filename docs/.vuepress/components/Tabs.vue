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
    <div class="panels"><slot /></div>
  </div>
</template>

<script>
const languages = {
  vanilla: `
    <svg viewBox="0 0 630 630" height="24">
      <rect width="630" height="630" fill="#f7df1e" />
      <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
    </svg>
    <span>Vanilla</span>
  `,
  vue: `
    <svg viewBox="0 0 261.76 226.69" height="24">
      <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
        <g transform="translate(178.06 235.01)">
          <path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883" />
        </g>
        <g transform="translate(178.06 235.01)">
          <path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e" />
        </g>
      </g>
    </svg>
    <span>Vue</span>
  `,
  react: `
    <svg viewBox="0 0 1001.13 890.65" height="24">
      <defs><style>.cls-2{fill:none;stroke:#00d8ff;stroke-miterlimit:10;stroke-width:24px}</style></defs>
      <circle cx="504.59" cy="444.48" r="89.57" fill="#00d8ff"/>
      <path class="cls-2" d="M504.59 262.37c120.25 0 232 17.26 316.2 46.26 101.49 34.94 163.88 87.9 163.88 135.85 0 50-66.13 106.24-175.11 142.35-82.4 27.3-190.82 41.55-305 41.55-117 0-227.87-13.38-311.18-41.85-105.42-36-168.91-93-168.91-142 0-47.57 59.57-100.11 159.64-135 84.57-29.53 199.05-47.16 320.48-47.16z"/><path class="cls-2" d="M346.06 354c60.07-104.17 130.83-192.32 198-250.81 81-70.46 158-98 199.56-74.1 43.29 25 59 110.36 35.83 222.81-17.52 85-59.34 186-116.37 284.95-58.44 101.33-125.39 190.66-191.68 248.6-83.87 73.32-165 99.85-207.43 75.37-41.2-23.77-57-101.63-37.2-205.74 16.71-87.97 58.62-195.93 119.29-301.08z"/><path class="cls-2" d="M346.21 537.06C286 433 244.92 327.66 227.82 240.23c-20.61-105.33-6-185.87 35.46-209.9 43.25-25 125.08 4 210.93 80.24C539.12 168.2 605.77 254.89 663 353.69 721.6 455 765.55 557.59 782.65 644c21.63 109.29 4.12 192.79-38.31 217.35-41.16 23.83-116.49-1.4-196.81-70.52-67.87-58.44-140.48-148.68-201.32-253.77z"/>
    </svg>
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
    this.$nextTick(() => {
      const tabs = this.tabs;
      const selectedLang = this.$selectedLang || tabs[0].name;
      const result = tabs.reduce((partial, tab) => {
        tab.isActive = tab.name === selectedLang;

        return partial || tab.isActive;
      }, false);

      if (!result) {
        tabs[0].isActive = true;
      }
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
      padding: 11px 25px 6px;
      margin: 0 0 -1px;
      text-align: center;
      text-decoration: none !important;

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
      border-bottom: 2px solid #fff;
      border-top: 2px solid goldenrod;
      color: #555;

      :global(svg) {
        opacity: 1;
      }
    }
  }
}
</style>
