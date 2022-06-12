<!--
 * @Author: vuvivian
 * @Description: 请输入....
 * @Date: 2022-06-12 00:08:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-06-12 00:08:07
 * @FilePath: /Girl-Blog/docs/.vuepress/components/LastUpdated.vue
-->
<template>
</template>

<script>
export default {
  props: ['slot-key'],
  mounted () {
      this.$page.lastUpdated = "2022/1/6 下午2:00:00";
  }
};
</script>