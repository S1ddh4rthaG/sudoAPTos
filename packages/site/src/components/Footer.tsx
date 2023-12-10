export const Footer = () => {
  return (
    <footer className="d-none">
      <div className="container-fluid align-items-center">
        <div className="row ms-2 border-top footer me-2 p-1">
          <div className="col-10 p-0 m-0">
            <p className="text-light align-middle m-0 footer-text">© sudoAptos 2023. All Rights Reserved</p>
          </div>
          <div className="col-2 text-end p-0 m-0">
            <a href="#" className="text-light align-middle m-0 footer-text fs-5">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};