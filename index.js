moveLeftDictionary = {
	'N': 'W',
	'E': 'N',
	'S': 'E',
	'W': 'S'
}

moveRightDictionary = {
	'N': 'E',
	'E': 'S',
	'S': 'W',
	'W': 'N'
}

moveForwardDictionary = {
	'N': { x: 0, y: 1 },
	'E': { x: 1, y: 0 },
	'S': { x: 0, y: -1 },
	'W': { x: -1, y: 0 }
}

const robots = []

const map = prompt('Map coords:').split(' ') 
	const mapObj = {
		'x': parseInt(map[0]),
		'y': parseInt(map[1]),

	}
const getUserInput = () => {
	while (true) {
		robots.push(prompt('Please enter the details of a robot').replaceAll(' ', ''));

		if (prompt('Would you like to add another robot? (y/n)') === 'n') break
	}
}

const moveForwardFunc = (robotObj) => {

	newPos = moveForwardDictionary[robotObj.orientation] //the robot's orientation is used to get an object with the proposed changes to its x and y axis

	if (checkBounds(
		newPos.x == 0 ? robotObj.y + newPos.y : robotObj.x + newPos.x,
		newPos.x == 0 ? mapObj.y : mapObj.x,
		robotObj
	)) { //if checkBounds returns true then the proposed move is executed
		robotObj.x += newPos.x
		robotObj.y += newPos.y
	}

}

const checkBounds = (proposedPos, mapPos, robotObj) => {
	if (proposedPos > mapPos || proposedPos < 0) { //A check is made to ensure that the proposed move is valid
		robotObj.isLost = true;
		return false
	}
	return true
}

const handleRobot = (robot) => {
	const robotInstruction = robot.split('(')[1].split(')') //the user input is formatted to make it easier to work with throughout the code
	const robotCoords = robotInstruction[0].split(',')

	robotObj = {
		'x': parseInt(robotCoords[0]),
		'y': parseInt(robotCoords[1]),
		'orientation': robotCoords[2],
		'instructions': robotInstruction[1],
		'isLost': false
	}


	for (const move of robotObj.instructions.split('')) { 
		if (robotObj.isLost) break; //if the robot is marked as lost then there is no need to keep going through the instructions list

		if (move === 'F') {
			moveForwardFunc(robotObj) //the forward move is a bit more tricky so I took it out into its own function to modularise the code
		} else if (move === 'L') {
			robotObj.orientation = moveLeftDictionary[robotObj.orientation] //the left and right moves are handled by a dictionary so that no repeated conditional statements have to be used
		} else if (move === 'R') {
			robotObj.orientation = moveRightDictionary[robotObj.orientation]
		}
	}
	
	console.log(`(${robotObj.x}, ${robotObj.y}, ${robotObj.orientation}) ${robotObj.isLost ? 'LOST' : ''} `)
}


getUserInput()

robots.forEach(robot => handleRobot(robot))
