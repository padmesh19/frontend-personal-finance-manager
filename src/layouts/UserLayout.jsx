const UserLayout = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    return (
      <>
        <div>
          <p>Dashboard</p>
        </div>
        <main className="flex-grow">{children}</main>
      </>
    );
}

export default UserLayout;
