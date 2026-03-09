/*
import { AboutSection } from '../sections/aboutSection';
import { useNavigate } from 'react-router';
import { useAppDispatch, type RootState } from '../redux/store';
import { fetchOwners } from '../redux/owner/owner.slice';
import { fetchCourses } from '../redux/course/course.slice';
import { Paths } from '../routes/paths';
import { BASE_URL } from '../App';*/
import {  useEffect, useMemo, useState } from 'react';
import '../styles/homePage.css'; // נניח שזה קובץ ה-CSS שלך
import { useSelector } from 'react-redux';
import { ArrowLeft, Badge, Play, SearchX, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import SearchBar from '../components/ui/SearchBar';
import { useAppDispatch, type RootState } from '../redux/store';
import { useNavigate } from 'react-router';
import { fetchOwners } from '../redux/owner/owner.slice';
import { fetchCourses } from '../redux/course/course.slice';
import { BASE_URL } from '../App';
import { Paths } from '../routes/paths';



/*
const HomePage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const owners = useSelector((state: RootState) => state.owner.owners);
    const courses = useSelector((state: RootState) => state.course.courses)
    useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchCourses())
    
    },
     [dispatch]);
   
    return (
        <div className="home-page-container">
            {/* סקשן קורסים זמינים *//*}
            <section className="featured-courses">
                <h2>קורסים זמינים ומבוקשים</h2>
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card">
                            <img src={`${BASE_URL}${course.image}`} alt={course.name} className="course-image" />
                            <h3>{course.name}</h3>
                            <p className="course-description">{course.description}</p>
                            <p className="course-publisher">מפרסם: {course.owner.ownerName}</p>
                            <p className="course-rating">מחיר: {course.price} ⭐</p>
                            <button className="view-course-button" onClick={()=> navigate(`/${Paths.courseView}/${course.id}`)}>צפה בקורס</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* סקשן מפרסמים בולטים *//*}
            /*<section className="prominent-publishers">
                <h2>מפרסמים מובילים</h2>
                <div className="publishers-grid">
                    {owners.map(publisher => (
                        <div key={publisher.id} className="publisher-card">
                            <img src={`${BASE_URL}${publisher.image}`} alt={publisher.ownerName} className="publisher-logo" />
                            <h3>{publisher.ownerName}</h3>
                            <p className="publisher-description">כדאי להוסיף תיאור על הבעלים</p>
                            <button className="view-publisher-button" onClick={()=> navigate(`/${Paths.ownerView}/${publisher.id}`)}>צפה במפרסם</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* סקשן אודות */
            /*<AboutSection/>
        /*</div>/*
    );
};/*

export default HomePage;*/

export default function HomePage() {
  const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const owners = useSelector((state: RootState) => state.owner.owners);
    const courses = useSelector((state: RootState) => state.course.courses)
    useEffect(() => {
  async function loadData() {
    setIsLoading(true);
    try {
      await Promise.all([dispatch(fetchOwners()), dispatch(fetchCourses())]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
     setIsLoading(false); 
    }
  }
  loadData();
}, [dispatch]);

// 2. חישוב נגזר (Derive) - לא צריך useState!
// החישוב ירוץ אוטומטית בכל פעם שהקורסים משתנים
const maxPrice = useMemo(() => {
  if (!courses || courses.length === 0) return 0;
  return Math.max(...courses.map(c => c.price));
}, [courses]);

// 3. עדכון טווח המחירים (רק כש-maxPrice משתנה)
useEffect(() => {
  if (maxPrice > 0) {
    setPriceRange([0, maxPrice]);
  }
}, [maxPrice]); // תלוי רק ב-maxPrice

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Filter courses based on search query and price range (kept in state)
  const [filteredCourses, setFilteredCourses] = useState(() =>
    courses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.owner.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesPrice;
    })
  );

  // Keep filtered list in sync with priceRange, searchQuery and courses
  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) => {
        const matchesSearch =
          searchQuery === "" ||
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.owner.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

        return matchesSearch && matchesPrice;
      })
    );
  }, [priceRange, searchQuery, courses]);

  // debug: trace filters and results
  console.log(
    "debug: searchQuery",
    searchQuery,
    "priceRange",
    priceRange,
    "maxPrice",
    maxPrice,
    "filteredCount",
    filteredCourses.length,
    "courses.length",
    courses.length,
    "coursePrices",
    courses.map((c) => c.price),
    "filteredIds",
    filteredCourses.map((c) => c.id)
  );

  const hasActiveFilters = searchQuery !== "" || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const handleClearFilters = () => {
    console.log("handleClearFilters called. current priceRange:", priceRange, "maxPrice:", maxPrice);
    setSearchQuery("");
    const currentMax = courses && courses.length ? Math.max(...courses.map(c => c.price)) : 0;
    console.log("handleClearFilters: computed currentMax", currentMax);
    setPriceRange([0, currentMax]);
    console.log("handleClearFilters: priceRange set to", [0, currentMax]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  if (isLoading ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>טוען את הקורסים...</p>
      </div>
    );}
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FA8072]/10 via-white to-[#40E0D0]/10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#FA8072]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#40E0D0]/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-[#FA8072] to-[#40E0D0] text-white border-0 px-4 py-1.5 text-sm">
              <Sparkles className="w-4 h-4 ml-2" />
              פלטפורמת הלמידה המובילה
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              גלה את הדרך שלך
              <br />
              <span className="bg-gradient-to-r from-[#FA8072] to-[#40E0D0] bg-clip-text text-transparent">
                להצלחה מקצועית
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              קורסים מקצועיים מהמומחים המובילים בתעשייה. 
              למד בקצב שלך, מכל מקום ובכל זמן.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FA8072] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#FA8072] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#FA8072]/25 transition-all duration-300 hover:scale-105"
              >
                התחל ללמוד עכשיו
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#40E0D0] text-[#20B2AA] hover:bg-[#40E0D0]/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 ml-2" />
                צפה בסרטון
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            קורסים זמינים ומבוקשים
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8">
            הקורסים הפופולריים ביותר שנבחרו במיוחד עבורך
          </p>
        </motion.div>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          maxPrice={maxPrice}
        />

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <SearchX className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">לא נמצאו תוצאות</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              לא מצאנו קורסים התואמים את החיפוש שלך. נסה לשנות את הקריטריונים או נקה את הסינונים.
            </p>
            <Button 
              onClick={handleClearFilters}
              className="bg-gradient-to-r from-[#FA8072] to-[#40E0D0] text-white rounded-xl"
            >
              נקה סינונים
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#FA8072]/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${BASE_URL}${course.image}`}
                  alt={course.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-[#FA8072] backdrop-blur-sm">
                    <Star className="w-3 h-3 ml-1 fill-[#FA8072]" />
                    {course.id}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <Button className="w-full bg-white/90 text-slate-800 hover:bg-white backdrop-blur-sm" onClick={()=> navigate(`/${Paths.courseView}/${course.id}`)}>
                    <Play className="w-4 h-4 ml-2" />
                    צפה בקורס
                  </Button>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">
                  {course.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FA8072] to-[#40E0D0] flex items-center justify-center text-white text-xs font-bold">
                      {course.owner.ownerName.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-600">{course.owner.ownerName}</span>
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-[#FA8072] to-[#40E0D0] bg-clip-text text-transparent">
                    ₪{course.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {filteredCourses.length > 0 && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-200 hover:border-[#40E0D0] hover:text-[#20B2AA] rounded-xl px-8"
            >
              צפה בכל הקורסים
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </div>
        )}
      </section>

      {/* Publishers Section */}
      <section className="bg-gradient-to-br from-[#FA8072]/5 via-white to-[#40E0D0]/5 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              מפרסמים מובילים
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">
              למד מהמומחים הטובים ביותר בתעשייה
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {owners.map((publisher) => (
              <motion.div
                key={publisher.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group bg-white rounded-2xl p-6 text-center shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#40E0D0]/20 transition-all duration-500 cursor-pointer"
              >
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FA8072] to-[#40E0D0] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <img
                    src={`${BASE_URL}${publisher.image}`}
                    alt={publisher.ownerName}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-[#FA8072] to-[#40E0D0] rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg mb-2">
                  {publisher.ownerName}
                </h3>
                
                <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
                  <span>{3} קורסים</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span>{" "} תלמידים</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#40E0D0] text-[#20B2AA] hover:bg-[#40E0D0]/10 rounded-lg group-hover:bg-gradient-to-r group-hover:from-[#FA8072] group-hover:to-[#40E0D0] group-hover:text-white group-hover:border-transparent transition-all duration-300"
                 onClick={()=> navigate(`/${Paths.ownerView}/${publisher.id}`)}>
                  צפה בפרופיל
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FA8072] to-[#40E0D0] rounded-3xl p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "50+", label: "קורסים זמינים" },
              { value: "10K+", label: "תלמידים פעילים" },
              { value: "20+", label: "מדריכים מומחים" },
              { value: "4.9", label: "דירוג ממוצע" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              למה לבחור בנו?
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              אנחנו מאמינים שכל אחד יכול ללמוד ולהתפתח. הפלטפורמה שלנו מציעה 
              קורסים איכותיים מהמומחים המובילים בתעשייה, עם גישה נוחה מכל מקום.
            </p>
            
            <div className="space-y-4">
              {[
                "קורסים מקצועיים עם תוכן עדכני",
                "מדריכים מנוסים ומומחים בתחומם",
                "גישה לכל החיים לתכנים",
                "תמיכה ומענה מהיר"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FA8072] to-[#40E0D0] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FA8072]/20 to-[#40E0D0]/20 rounded-3xl transform rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
              alt="Learning together"
              className="relative rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              מוכן להתחיל את המסע שלך?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              הצטרף לאלפי הסטודנטים שכבר משתמשים בפלטפורמה שלנו ומפתחים את הקריירה שלהם
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#FA8072] to-[#40E0D0] hover:from-[#40E0D0] hover:to-[#FA8072] text-white px-10 py-6 text-lg rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
            >
              התחל ללמוד בחינם
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
