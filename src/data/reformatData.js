export default function reformatData(festivals) {
  return festivals.map(festival => {
    festival.festStartDate = new Date(festival.festStartDate)
    if (festival.festEndDate === '') {
      festival.festEndDate = null
    } else {
      festival.festEndDate = new Date(festival.festEndDate)
    }
    const newTimeTable = festival.timeTable.map(act => {
      act.actStartDate = new Date(act.actStartDate)
      act.actEndDate = new Date(act.actEndDate)
      return act
    })
    festival.timeTable = newTimeTable
    return festival
  })
}
