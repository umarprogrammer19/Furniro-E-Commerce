import React from "react";

export default function ComparisonTable() {
  const information = [
    {
      general: {
        package: "1 sectional sofa",
        model_number: "TFCBUGRBL65RHS",
        secondary_material: "Solid Wood",
        configuration: "L-shaped",
        upholstery_material: "Fabric + Cotton",
        upholstery_color: "Bright Grey & Lion",
      },
      product: {
        filling_material: "Foam",
        finish_type: "Bright Grey & Lion",
        headrest: "No",
        max_load_capacity: 280,
        origin: "India",
      },
      dimension: {
        width: "265.32 cm",
        height: "76 cm",
        depth: "167.76 cm",
        weight: "45 KG",
        seat_height: "41.52 cm",
        leg_height: "5.46 cm",
      },
      warranty: {
        summary: "1 Year Manufacturing Warranty",
        service_type: "For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com",
        covered: "Warranty Against Manufacturing Defect",
        not_covered: "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
        domestic: "1 Year",
      },
    },
    {
      general: {
        package: "1 Three Seater, 2 Single Seater",
        model_number: "DTUBUGRBL568",
        secondary_material: "Solid Wood",
        configuration: "L-shaped",
        upholstery_material: "Fabric + Cotton",
        upholstery_color: "Bright Grey & Lion",
      },
      product: {
        filling_material: "Matte",
        finish_type: "Bright Grey & Lion",
        headrest: "Yes",
        max_load_capacity: 300,
        origin: "India",
      },
      dimension: {
        width: "265.32 cm",
        height: "76 cm",
        depth: "167.76 cm",
        weight: "65 KG",
        seat_height: "41.52 cm",
        leg_height: "5.46 cm",
      },
      warranty: {
        summary: "1.2 Year Manufacturing Warranty",
        service_type: "For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com",
        covered: "Warranty of the product is limited to manufacturing defects only.",
        not_covered: "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
        domestic: "3 Months",
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        {/* General Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-semibold">Feature</div>
            {information.map((_, index) => (
              <div key={index} className="font-semibold">
                Product {index + 1}
              </div>
            ))}
            {Object.keys(information[0].general).map((key) => (
              <React.Fragment key={key}>
                <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                {information.map((item, index) => (
                  <div key={index}>{item.general[key as keyof typeof item.general]}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Product Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-semibold">Feature</div>
            {information.map((_, index) => (
              <div key={index} className="font-semibold">
                Product {index + 1}
              </div>
            ))}
            {Object.keys(information[0].product).map((key) => (
              <React.Fragment key={key}>
                <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                {information.map((item, index) => (
                  <div key={index}>{item.product[key as keyof typeof item.product]}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Dimension Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Dimension</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-semibold">Feature</div>
            {information.map((_, index) => (
              <div key={index} className="font-semibold">
                Product {index + 1}
              </div>
            ))}
            {Object.keys(information[0].dimension).map((key) => (
              <React.Fragment key={key}>
                <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                {information.map((item, index) => (
                  <div key={index}>{item.dimension[key as keyof typeof item.dimension]}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Warranty Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Warranty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-semibold">Feature</div>
            {information.map((_, index) => (
              <div key={index} className="font-semibold">
                Product {index + 1}
              </div>
            ))}
            {Object.keys(information[0].warranty).map((key) => (
              <React.Fragment key={key}>
                <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                {information.map((item, index) => (
                  <div key={index}>{item.warranty[key as keyof typeof item.warranty]}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
