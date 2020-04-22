const axios = require("axios")
console.log("Testes Iniciados...")

async function rover() {
try {
     const response = await axios.get(`https://verify.eryn.io/api/user/326123612153053184`)
      if(response.data.status === "ok") {
      console.log("RoVer Details...PASSED")
      }
  } catch(e) {
   console.log(e)
   console.log("RoVer Details...FAILED")
  }
}
async function whois() {
try {
	const rover = await axios.get(`https://verify.eryn.io/api/user/326123612153053184`)
  	if(rover.data.status === "ok") {
  	const getRobloxDetails = await axios.get(`https://users.roblox.com/v1/users/${rover.data.robloxId}`)
  	const getRobloxStatus = await axios.get(`https://api.roblox.com/users/${rover.data.robloxId}/onlinestatus`)
  	console.log(`Roblox API...PASSED (Username: ${rover.data.robloxUsername} | Online: ${getRobloxStatus.data.IsOnline})`)
  }
} catch(e) {
console.log(e)
console.log("Roblox API...FAILED")
}
}

rover()
whois()

