const Urlfy = ugly => (
   // ugly.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
   ugly.toLowerCase().replace(/\s+/g, '-').replace(/[\u0300-\u036f]/g, "")
)

export default Urlfy