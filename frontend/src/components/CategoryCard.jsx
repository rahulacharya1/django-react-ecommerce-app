function CategoryCard({ cat }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            <div className="absolute top-0 left-0 h-1 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full" />

            <div className="flex flex-col gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <span className="text-lg font-bold">
                        {cat.name.charAt(0)}
                    </span>
                </div>

                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-800 transition-colors group-hover:text-indigo-700">
                        {cat.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                        {cat.description || "No description provided for this category."}
                    </p>
                </div>

                <div className="mt-4 flex items-center pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-400">
                        View Details →
                    </span>
                </div>

            </div>
        </div>
    );
}

export default CategoryCard;
