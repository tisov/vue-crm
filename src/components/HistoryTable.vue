<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, i) in records" :key="rec.recId">
        <td>{{i + 1}}</td>
        <td>{{rec.amount | currency}}</td>
        <td>{{rec.date | date('date')}}</td>
        <td>{{rec.catName}}</td>
        <td>
          <span class="white-text badge"
            :class="[rec.typeClass]"
          >
            {{rec.recType}}
          </span>
        </td>
        <td>
          <button class="btn-small btn" v-tooltip="'Открыть запись'"
            @click="$router.push(`/detail-record/${rec.recId}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- ------------------------------------- -->
<script>
export default {
  props: {
    records: {
      type: [Array],
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>