import { type Dispatch, type SetStateAction } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Popover,

  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Slider } from "./slider";
// הגדרת הממשק (Interface)
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  maxPrice: number
}

export default function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  priceRange, 
  setPriceRange,
  onClearFilters,
  hasActiveFilters,
  maxPrice
}:SearchBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-2 border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search className="w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="חפש קורס לפי שם, תיאור או מפרסם..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-lg"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className={`border-2 rounded-xl ${hasActiveFilters ? 'border-[#FA8072] bg-[#FA8072]/5' : ''}`}
                >
                  <SlidersHorizontal className="w-5 h-5 ml-2" />
                  סינון
                  {hasActiveFilters && (
                    <Badge className="mr-2 bg-[#FA8072] text-white">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">טווח מחירים</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={(value) => {
    // אנחנו מוודאים שהערך שנכנס הוא אכן מערך של 2 מספרים
    // ואז מעדכנים את ה-State
    setPriceRange([value[0], value[1]]);
  }}                    min ={0}
                        max={maxPrice}
                        step={10}
                        minStepsBetweenThumbs={1}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <div className="bg-slate-100 px-3 py-1.5 rounded-lg">
                          <span className="text-slate-600">מ-</span>
                          <span className="font-bold text-slate-800 mr-1">₪{priceRange[0]}</span>
                        </div>
                        <div className="h-px w-8 bg-slate-300" />
                        <div className="bg-slate-100 px-3 py-1.5 rounded-lg">
                          <span className="text-slate-600">עד</span>
                          <span className="font-bold text-slate-800 mr-1">₪{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onClearFilters}
                className="text-slate-500 hover:text-[#FA8072] rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-600">סינונים פעילים:</span>
            {priceRange[0] > 0 || priceRange[1] < maxPrice ? (
              <Badge 
                variant="secondary" 
                className="bg-[#FA8072]/10 text-[#FA8072] border border-[#FA8072]/20 px-3 py-1"
              >
                מחיר: ₪{priceRange[0]} - ₪{priceRange[1]}
              </Badge>
            ) : null}
        </div>
      )}
    </div>
  );
}