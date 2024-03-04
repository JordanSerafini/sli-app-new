interface badgeProps {
    name: string;
    css: string;
    }

function badge({name, css} : badgeProps) {


let theme = ``;
    switch (name) {
        case "Famille-1":
            theme = `bg-red-500 text-white`
            break;
        case "Famille-2":
            theme = `bg-blue-500 text-white`
            break;
        case "Famille-3":
            theme = `bg-green-500 text-white`
            break;
        default:
            theme = `bg-gray-500 text-white`
            break;
    }

    


  return (
    <div className={`${css} ${theme} border-1 border-black px-4 w-fit`}>
        {name}
    </div>
  )
}

export default badge