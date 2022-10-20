import { types } from '../assets'

export const PlaceHolder = () => (
    <div className='rounded-full w-[40px] h-[40px] 
    flex items-center justify-center opacity-80
    hover:opacity-100 scale-90 hover:scale-100 bg-gray-500/75
    transition ease-in-out duration-300'>
    </div>
)

const PokemonType = ({ type, size }) => {
    let imgUrl;
    if (type) imgUrl = new URL(`../assets/icons/${types[type].icon}`, 
    import.meta.url).href;

    return (
        <div className={`rounded-full 
        ${size} lg:w-[40px] lg:h-[40px]
        flex items-center justify-center backdrop-blur-sm z-0
        ${type && types[type].backgroundColor}`}>
            <img src={imgUrl} alt={type} 
            className='p-[5px] lg:p-[10px]'/>
        </div>
    )
}

export default PokemonType