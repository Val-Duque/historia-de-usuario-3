let nombre = (prompt("Tu nombre: ")).toUpperCase()
let edad = prompt("Tu edad: ")


if (edad > 18) {
    console.warn(`Hola ${nombre} eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`)

}

else if (edad < 18) {
    console.error(`Hola  ${nombre} eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`)
}

