export default function reformatData(festivals) {
  return festivals.map(festival => {
    festival.festStartDate = new Date(festival.festStartDate.replace(/-/g, '/'))
    if (festival.festEndDate === '') {
      festival.festEndDate = null
    } else {
      festival.festEndDate = new Date(festival.festEndDate.replace(/-/g, '/'))
    }
    const newTimeTable = festival.timeTable.map(act => {
      act.actStartDate = new Date(act.actStartDate.replace(/-/g, '/'))
      act.actEndDate = new Date(act.actEndDate.replace(/-/g, '/'))
      return act
    })
    festival.timeTable = newTimeTable
    return festival
  })
}
