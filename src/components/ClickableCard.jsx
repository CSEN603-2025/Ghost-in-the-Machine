function ClickableCard({header, details, nextPage, onClick}) {
    return ( 
    <div
    onClick = {onClick}
    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
        <h3 className="text-xl font-semibold text-[#00106A] mb-4">{header}</h3>
        <p className="text-gray-600">{details}</p>
    </div> 
    );
}

export default ClickableCard;