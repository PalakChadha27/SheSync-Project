import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  HeartPulse,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  Stethoscope,
  Bot,
  ChevronRight,
  Calendar,
  Heart,
  Moon,
  Sun,
  Users,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  HeartHandshake,
  Gamepad2,
  Handshake,
  Bookmark,
  Bell,
  CheckCircle,
  AlertCircle,
  User,
  XCircle,
  ChevronDown,
} from "lucide-react";

export function Forum() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("forums");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New reply on your post", read: false },
    { id: 2, text: "3 new messages in Women's Health", read: false },
  ]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [solvedPosts, setSolvedPosts] = useState([1]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLike = (postId) => {
    setRecentPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setBookmarks(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications =>
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleSolved = (postId) => {
    setSolvedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Data arrays
  const forums = [
    { id: 1, name: (<a href="https://samawomenshealth.in/">Women's Health</a>), members: 1200, posts: 5600,},
    { id: 2, name: (<a href="https://theskillcollective.com/womens-health">Fitness & Nutrition</a>), members: 980, posts: 4200,},
    { id: 3, name: (<a href="https://www.betterhealth.vic.gov.au/campaigns/womens-sexual-and-reproductive-health">Mental Wellness</a>), members: 850, posts: 3800,},
    { id: 4, name: (<a href="https://www.meetup.com/find/?source=GROUPS&keywords=Women%27s%20Fitness">Reproductive Health</a>), members: 720, posts: 3100,},
  ];

  const recentPosts = [
    {
      id: 1,
      title: "My PCOS Journey",
      author: "Ariza Khan",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Best Foods for Hormonal Balance",
      author: "Riya Patel",
      likes: 38,
      comments: 9,
    },
    {
      id: 3,
      title: "Coping with Endometriosis",
      author: "Ishita Roy",
      likes: 52,
      comments: 17,
    },
  ];

  const trendingTopics = [
    (<a href="https://www.healthline.com/health/womens-health/menstrual-cup">Menstrual Cup Usage</a>),
    (<a href="https://www.healthline.com/nutrition/balance-hormones">Hormone Balancing Foods</a>),
    (<a href="https://www.fda.gov/consumers/knowledge-and-news-women-owh-blog/understanding-endometriosis-symptoms-treatment">Endometriosis Awareness</a>),
    (<a href="https://hormonehealth.co.uk/top-10-fertility-apps">Fertility Tracking Apps</a>),
    (<a href="https://my.clevelandclinic.org/health/diseases/21841-menopause">Menopause Symptoms</a>),
  ];

  // Filtered and sorted data
  const filteredForums = forums.filter(forum => {
    if (filterBy === "large") return forum.members > 1000;
    if (filterBy === "active") return forum.posts > 5000;
    return true;
  });

  const sortedPosts = [...recentPosts]
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      return b.id - a.id;
    })
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ProfileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1"
    >
      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
        <User className="mr-3 h-5 w-5" /> Profile
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
        <Bookmark className="mr-3 h-5 w-5" /> Bookmarks
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
        <CheckCircle className="mr-3 h-5 w-5" /> My Solutions
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
        <XCircle className="mr-3 h-5 w-5" /> Logout
      </button>
    </motion.div>
  );

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <nav className="mt-8">
          <div className="px-4 py-4 flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">
              SheSync
            </h1>
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink
              icon={<Home size={20} />}
              label="Home"
              onClick={() => navigate("/")}
            />
            <SidebarLink
              icon={<GraduationCap size={20} />}
              label="Education"
              onClick={() => navigate("/blogs")}
            />
            <SidebarLink
              icon={<ShoppingBag size={20} />}
              label="Shop"
              onClick={() => navigate("/Ecom")}
            />
            <SidebarLink
              icon={<ActivitySquare size={20} />}
              label="Track Your Health"
              onClick={() => navigate("/tracker")}
            />
            <SidebarLink
              icon={<Stethoscope size={20} />}
              label="Expert Consultation"
              onClick={() => navigate("/consultations")}
            />
            <SidebarLink
              icon={<Bot size={20} />}
              label="Eve"
              onClick={() => navigate("/ChatBot")}
            />
            <SidebarLink
              icon={<HeartPulse size={20} />}
              label="HealthLens"
              onClick={() => navigate("/symptomsanalyzer")}
            />
            <SidebarLink
              icon={<MessageSquare size={20} />}
              label="Forums"
              onClick={() => navigate("/forums")}
              active
            />
            <SidebarLink
              icon={<HeartHandshake size={20} />}
              label="ShareJoy"
              onClick={() => window.open("https://thepadproject.org/donate/", "_blank")}
            />
            <SidebarLink
              icon={<Gamepad2 size={20} />}
              label="Bliss"
              onClick={() =>
                window.open(
                  "https://she-syncgame.vercel.app/",
                  "_blank"
                )
              }
            />
            <SidebarLink
              icon={<Handshake size={20} />}
              label="NGO's"
              onClick={() =>
                window.open(
                  "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html",
                  "_blank"
                )
              }
            />
          </div>
        </nav>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-0 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        style={{
          transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
        }}
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              Community Forums
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 relative rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
                  )}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2"
                    >
                      <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
                        Notifications
                      </div>
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-2 text-sm flex items-center justify-between ${
                            !notification.read ? "bg-pink-50 dark:bg-gray-700" : ""
                          }`}
                        >
                          <span>{notification.text}</span>
                          {!notification.read && (
                            <button
                              onClick={() => markNotificationRead(notification.id)}
                              className="text-pink-600 hover:text-pink-700"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src="/images/women.jpeg"
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </button>
                <AnimatePresence>
                  {showProfileMenu && <ProfileMenu />}
                </AnimatePresence>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("forums")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "forums"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } dark:bg-gray-800 dark:text-gray-100`}
              >
                Forums
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "posts"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } dark:bg-gray-800 dark:text-gray-100`}
              >
                Recent Posts
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showFilters && (
                  <div className="absolute z-10 mt-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-md shadow-lg p-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-transparent p-2 text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="likes">Most Likes</option>
                      <option value="comments">Most Comments</option>
                    </select>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full bg-transparent p-2 text-sm mt-2"
                    >
                      <option value="all">All Forums</option>
                      <option value="large">Large Communities</option>
                      <option value="active">Active Communities</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search forums..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* Forums List */}
          {activeTab === "forums" && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {filteredForums.map((forum) => (
                <motion.div
                  key={forum.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {forum.name}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" /> {forum.members} members
                    </span>
                    <span className="flex items-center">
                      <MessageSquare size={16} className="mr-1" /> {forum.posts} posts
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Recent Posts */}
          {activeTab === "posts" && (
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {sortedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md relative group"
                >
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleSolved(post.id)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {solvedPosts.includes(post.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          bookmarks.includes(post.id)
                            ? "text-pink-600 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By {post.author}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center hover:text-pink-600 transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 mr-1 ${
                          post.likes > 0 ? "text-pink-600 fill-current" : ""
                        }`}
                      />
                      {post.likes} likes
                    </button>
                    <span className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      {post.comments} comments
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Trending Topics
            </h3>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer transition-colors"
                >
                  <TrendingUp
                    size={16}
                    className="mr-2 text-pink-600 dark:text-pink-400"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

const SidebarLink = ({ icon, label, onClick, active = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
        active
          ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};