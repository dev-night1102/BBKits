export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BB</span>
            </div>
            <span className="text-lg font-bold text-gray-900">BBKits</span>
        </div>
    );
}
