let Buttons = document.getElementsByTagName("button")
let OperationButtons = [ BtnAdd, BtnSub, BtnMult, BtnDiv ]
let Stack = [], CurrentString = "", Emtpty = ""

for (let index = 0; index < Buttons.length; index++) {
    const button = Buttons[index];
    
    button.onclick = function() {
        CurrentString += this.innerText

        CurrentInput.innerText = CurrentString
    }
}

OperationButtons.forEach(element => {
    element.onclick = function() {

        if (CurrentString == "")
        {
            let LastElement = Stack.pop()
            Stack.push( LastElement == undefined ? "0" : LastElement )

            LastElement = Stack.pop()
            
            if (!IsOperation(LastElement))
            {
                Stack.push(LastElement)
            }
        }
        else {
            Stack.push(CurrentString)
        }

    
        Stack.push(this.innerText)
        CurrentString = ""       
        HistoryInput.innerText = StackToString()
        CurrentInput.innerText = ""
        
    }
})

BtnFloat.onclick = function() {
    if (!CurrentString.includes('.')) {
        CurrentString += '.'

        CurrentInput.innerText = CurrentString
    }
}

BtnClean.onclick = function() {
    
    CurrentString = CurrentString.slice(0, -1);

    CurrentInput.innerText = CurrentString
}

BtnCleanAll.onclick = function() {
    Stack = []
    CurrentString = ""

    HistoryInput.innerText = ""
    CurrentInput.innerText = ""
}

BtnCalc.onclick = function() {
    Stack.push(CurrentString)

    CurrentString = eval(StackToString())

    if (CurrentString != undefined) CurrentString.toString()

    Stack = []
    HistoryInput.innerText = ""
    CurrentInput.innerText = CurrentString
}

function StackToString() {
    let str = Stack.toString()

    while (str.includes(',')) {
        str = str.replace(',', ' ')
    }
    return str
}

function IsOperation(elem) {
    return (elem == "+" || elem == "-" || elem == "*" || elem == "/")
}