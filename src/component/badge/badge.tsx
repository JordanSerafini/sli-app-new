interface badgeProps {
    name: string | number | null;
    css: string;
    color?: string;
    }

function badge({name, css, color} : badgeProps) {


let theme = ``;
    switch (name) {
        case "PREST":
            theme = `border-blue-300 border-1 text-blue-500`
            break;
        case "MAT":
            theme = `border-green-300 border-1 text-green-500`
            break;
        case "CO":
            theme = `border-orange-500 border-1 text-orange-600`
            break;
        case "CM":
            theme = `bg-yellow-500 text-white`
            break;
        case "MULTIFONCT":
            theme = `bg-purple-500 text-white`
            break;
        case "EBP":
            theme = `bg-blue-800 text-white`
            break;
        
        default:
            theme = `bg-gray-500 text-white`
            break;
    }

    


  return (
    <div className={`${css} ${theme} border-1 border-${color} px-4 w-fit rounded-xl`}>
        {name}
    </div>
  )
}

export default badge