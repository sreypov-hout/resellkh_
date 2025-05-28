export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-50 border-t py-10 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-2">ReSellKH</h4>
          <p>We provide high-quality services and products to meet your needs.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-1">
            <li>Fashion</li>
            <li>Accessory</li>
            <li>Beauty</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">More</h4>
          <ul className="space-y-1">
            <li>Furniture</li>
            <li>Electronic</li>
            <li>Kitchen</li>
            <li>Book</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Private & Policy</li>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-8">&copy; 2025 ReSellKH. All rights reserved.</p>
    </footer>
  );
}
