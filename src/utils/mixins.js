import moment from 'moment'

export const dateFilter = {
  filters: {
    date(datetime) {
      return datetime ? moment(datetime).format('ll') : '-'
    }
  }
}