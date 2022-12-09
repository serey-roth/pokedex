const regions = ['national', 'kanto',
    'original-johto', 'updated-johto', 'hoenn', 'updated-hoenn',
    'original-sinnoh', 'extended-sinnoh', 'original-unova', 'updated-unova',
    'kalos-central', 'kalos-coastal', 'kalos-mountain',
    'original-ulaula', 'updated-ulaula', 
    'original-melemele', 'updated-melemele',
    'original-akala', 'updated-akala',
    'original-poni', 'updated-poni',
    'galar', 'isle-of-armor', 'crown-tundra', 'hisui'];

const PokedexRegions = ({ region, onChange }) => {
    return (
        <select className='text-white bg-black p-2 capitalize'
        value={region} onChange={ onChange }>
            {regions.map(region => (
                <option
                key={region} 
                value={region}
                >
                    {region.replace(/\-/g, ' ')}
                </option>
            ))}
        </select>
    )
}

export default PokedexRegions