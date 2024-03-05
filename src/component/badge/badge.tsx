interface badgeProps {
    name: string | number | null;
    css: string;
    }

function badge({name, css} : badgeProps) {


let theme = ``;
    switch (name) {
        case "PREST":
            theme = `border-blue-300 border-1 text-blue-500`
            break;
        case "MAT":
            theme = `border-green-300 border-1 text-green-500`
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