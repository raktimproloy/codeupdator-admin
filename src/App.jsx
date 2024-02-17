import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// Default Import
import Layout from "./layout/Layout";
import Loading from "@/components/Loading";
import NotFound from "@/pages/404"
import useAuthCheck from "./hooks/useAuthCheck";

// Auth Import
const Login = lazy(() => import("./pages/auth/login3"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password3"));

// Dashboard Import
const AnalyticsDashboard = lazy(() => import("./pages/dashboard/Analytics"));
const ProjectDashboard = lazy(() => import("./pages/dashboard/Project"));
const UserDashboard = lazy(() => import("./pages/dashboard/User"));

// User Management Import
const AddUser = lazy(() => import("./pages/user-management/AddUser"));
const UserDetails = lazy(() => import("./pages/user-management/DetailsUser"));

// Post Management Import
const AddPost = lazy(() => import("./pages/post-management/AddPost"));
const PostDetails = lazy(() => import("./pages/post-management/DetailsPost"));
const EditPost = lazy(() => import("./pages/post-management/EditPost"));

// Problem Management Import
const ProblemDetails = lazy(() => import("./pages/problem-management/index"));

// Top Rated Management Import
const TopRatedDetails = lazy(() => import("./pages/top-rated/index"));



function App() {
  const [isAuthenticated] = useAuthCheck();
  return (
    <main className="App  relative">
      <Routes>
      <Route
        path="/404"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
      {
        isAuthenticated === false ? 
        <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
        : <Route path='/' element={<Navigate to='/dashboard/analytics' replace />} />
      }
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPass />
              </Suspense>
            }
          />

        {
          isAuthenticated === true  ?
          <Route path="/*" element={<Layout />}>

            {/* Dashboard */}
            <Route path="dashboard/analytics" element={
              <Suspense fallback={<Loading />}>
                <AnalyticsDashboard />
              </Suspense>
            }/>
            <Route path="dashboard/project" element={
              <Suspense fallback={<Loading />}>
                <ProjectDashboard />
              </Suspense>
            } />
            <Route path="dashboard/user" element={
              <Suspense fallback={<Loading />}>
                <UserDashboard />
              </Suspense>
            } />

            {/* User */}
            <Route path="user/add" element={
              <Suspense fallback={<Loading />}>
                <AddUser />
              </Suspense>
            } />
            <Route path="user/details" element={
              <Suspense fallback={<Loading />}>
                <UserDetails />
              </Suspense>
            } />

            {/* Post */}
            <Route path="post/add" element={
              <Suspense fallback={<Loading />}>
                <AddPost />
              </Suspense>
            } />
            <Route path="post/details" element={
              <Suspense fallback={<Loading />}>
                <PostDetails />
              </Suspense>
            } />
            <Route path="post/edit" element={
              <Suspense fallback={<Loading />}>
                <EditPost />
              </Suspense>
            } />

            {/* Problem */}
            <Route path="problem/details" element={
              <Suspense fallback={<Loading />}>
                <ProblemDetails />
              </Suspense>
            } />

            {/* Top Rated */}
            <Route path="top-rated/details" element={
              <Suspense fallback={<Loading />}>
                <TopRatedDetails />
              </Suspense>
            } />

            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          : <Route path='*' element={<Navigate to='/' replace />} />
        }

      </Routes>
    </main>
  );
}

export default App;
