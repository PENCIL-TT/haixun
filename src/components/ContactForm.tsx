import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, Headphones, Package, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function QuickQuoteSection() {
  const [distance, setDistance] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE: Company Benefits */}
        <div>
          <p className="text-sm font-semibold text-orange-600 uppercase mb-2">
            Company Benefit
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Why Do You Like Translo?
          </h2>
          <p className="text-gray-600 mb-10 max-w-lg">
            More than a supplier, we work as a true partner and accompany you
            with recommendations based on your mobility data, so that you can
            reduce your costs.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: <Clock className="w-6 h-6 text-orange-600" />,
                title: "Right Time Delivery",
                desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.",
              },
              {
                icon: <Headphones className="w-6 h-6 text-orange-600" />,
                title: "24/7 Online Support",
                desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.",
              },
              {
                icon: <Package className="w-6 h-6 text-orange-600" />,
                title: "Safe Package",
                desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Quick Quote Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-orange-600 text-white rounded-2xl p-10 shadow-xl relative z-10"
        >
          <h3 className="text-2xl font-bold mb-6">Request Quick Quote</h3>

          <form className="space-y-6">
            {/* Distance slider */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Distance: <span className="ml-2 text-white font-normal">{distance} km</span>
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-white"
              />
            </div>

            {/* Input Fields */}
            <Input
              placeholder="Full Name"
              required
              className="bg-white text-gray-900 placeholder-gray-400 border-none"
            />
            <Input
              placeholder="Email"
              type="email"
              required
              className="bg-white text-gray-900 placeholder-gray-400 border-none"
            />
            <Input
              placeholder="Phone"
              type="tel"
              className="bg-white text-gray-900 placeholder-gray-400 border-none"
            />

            {/* Two Selects in one row */}
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger className="bg-white text-gray-900 border-none">
                  <SelectValue placeholder="Freight Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="road">Road</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="sea">Sea</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white text-gray-900 border-none">
                  <SelectValue placeholder="Load" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Load</SelectItem>
                  <SelectItem value="partial">Partial Load</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Write your message"
              rows={4}
              className="bg-white text-gray-900 placeholder-gray-400 border-none"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold py-6 text-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Request
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
